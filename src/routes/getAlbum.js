import express from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

router.get("/get/album", async (req, res) => {
  try {
    const resMusic = await prisma.album.findMany();
    res.status(200).json(resMusic);
  } catch (error) {
    res.status(400).json({ message: "algo deu errado!" });
  }
});

export default router;
