import express from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

router.get("/get/artist", async (req, res) => {
  try {
    const resArtist = await prisma.user.findMany({
      where: { role: "ARTIST" },
      select: { password: false, username: true, image: true, role: true, album: { include: { music: true } } },
    });
    res.status(200).json(resArtist);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "algo deu errado!" });
  }
});

export default router;
