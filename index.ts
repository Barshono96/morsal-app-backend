import { PrismaClient } from "@prisma/client";
import app from "./app";


const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();
app.listen(PORT, async () => {
  try {
    await prisma.$connect();
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log("Connected to the database successfully.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
});
