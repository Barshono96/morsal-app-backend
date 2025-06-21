import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export const insertFeedbacks = async (req: Request, res: Response) => {
  try {
    const filePath = path.join(__dirname, "../data/feedbacks.json");
    const rawData = fs.readFileSync(filePath, "utf-8");
    const feedbacks = JSON.parse(rawData);

    for (const f of feedbacks) {

      //check existing
      const exists = await prisma.feedback.findFirst({
        where: {
          email: f.email,
          message: f.feedback, 
        },
      });

      if (!exists) {
        await prisma.feedback.create({
          data: {
            name: f.name,
            email: f.email,
            message: f.feedback,
            createdAt: new Date(f.date),
          },
        });
      }
    }
    res.status(200).json({ message: "Feedbacks inserted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to insert feedbacks" });
  }
};

export const getFeedbacks = async (req: Request, res: Response) => {
  try {
    const { page = "1", limit = "10", date, name, email  } = req.query;

    const currentPage = Number(page);
    const pageLimit = Number(limit);
    const skip = (currentPage - 1) * pageLimit;

    const orderBy: any = {};
    if (date) {
      orderBy.createdAt = date === "asc" ? "asc" : "desc"; 
    }

    if (name) {
      orderBy.name = name === "asc" ? "asc" : "desc"; 
    }

    if (email) {
      orderBy.email = email === "asc" ? "asc" : "desc"; 
    }

    const [feedbacks, totalFeedbacks] = await Promise.all([
      prisma.feedback.findMany({
        select: {
          id: true,
          message: true,
          email: true,
          name: true,
          createdAt: true,
        },
        skip,
        take: pageLimit,
        orderBy,
      }),
      prisma.feedback.count(), //  total number of feedbacks for pagination
    ]);

    const totalPages = Math.ceil(totalFeedbacks / pageLimit);
    res.json({
      data:feedbacks,
      pagination: {
        totalFeedbacks,
        totalPages,
        currentPage,
        pageLimit,
      }});
      console.log("Pagination:", {
      totalFeedbackFound: totalFeedbacks,
      currentPage: currentPage,
      limit: pageLimit,
      totalPagesFound: totalPages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch feedbacks from DB" });
  }
};

export const deleteFeedbacks = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const feedBack = await prisma.feedback.findUnique({
      where: { id: parseInt(id) },
    });
    if (!feedBack) {
      return res.status(404).json({ message: "FeedBack not found" });
    }
    await prisma.feedback.delete({
      where: { id: parseInt(id) },
    });
    res
      .status(200)
      .json({ feedBack, message: "Feedback deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Feedback Deleted Failed" });
  }
};
