import { Request, Response } from "express";
import { Category, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//createCollection
export const createCollection = async (req: Request, res: Response) => {
  try {
    const { name, category } = req.body;
    const image = req.file?.filename;

    if (!name || !image || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const food = await prisma.food.create({
      data: {
        name,
        image,
        category,
      },
    });

    if (food) {
      res.status(201).json({
        id: food.id,
        name: food.name,
        image: food.image,
        category: food.category,
      });
    } else {
      res.status(400).json({ message: "Invalid food data" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//getCollection
export const getCollection = async (req: Request, res: Response) => {
  try {
    const { page = "1", limit = "10", category } = req.query;

    const currentPage = Number(page);
    const pageLimit = Number(limit);
    const skip = (currentPage - 1) * pageLimit;

    // Category filter (optional)
    const where: any = category && { category: String(category).toUpperCase() };

    // Total count for pagination
    const totalCount = await prisma.food.count({ where });

    // Fetch paginated + filtered food list
    const foods = await prisma.food.findMany({
      where,
      skip,
      take: pageLimit,
      orderBy: {
        createdAt: "asc", // or "desc" based on your requirement
      },
    });

    // Build image URL using base URL
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const transformedFoods = foods.map((food) => ({
      id: food.id,
      name: food.name,
      category: food.category,
      image: food.image ? `${baseUrl}/uploads/${food.image}` : null,
      createdAt: food.createdAt,
    }));

    // Send response
    res.status(200).json({
      success: true,
      data: transformedFoods,
    });
    console.log("Pagination:", {
      totalFound: totalCount,
      page: currentPage,
      limit: pageLimit,
      totalPages: Math.ceil(totalCount / pageLimit),
    });
  } catch (error) {
    console.error("Error in getCollection:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//updateCollection
export const updateCollection = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, category } = req.body;
    const image = req.file?.path;
    const food = await prisma.food.findUnique({
      where: { id: parseInt(id) },
    });
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }
    const updatedFood = await prisma.food.update({
      where: { id: parseInt(id) },
      data: {
        name: name || food.name,
        image: image || food.image,
        category: category || food.category,
      },
    });
    res.status(200).json(updatedFood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//deleteCollection
export const deleteCollection = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const food = await prisma.food.findUnique({
      where: { id: parseInt(id) },
    });
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }
    await prisma.food.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ food, message: "Food deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
