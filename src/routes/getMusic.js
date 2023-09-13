import express from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

router.get("/get/music", async (req, res) => {
  try {
    const resMusic = await prisma.music.findMany({ include: { musicViews: true } });
    const musicViewsCounts = resMusic.map((music) => {
      return {
        id: music.id,
        imageUrl: music.imageUrl,
        authorName: music.authorName,
        name: music.name,
        description: music.description,
        releaseDate: music.releaseDate,
        musicUrl: music.musicUrl,
        authorId: music.authorId,
        playlistId: music.playlistId,
        views: music.musicViews.length,
      };
    });
    res.status(200).json(musicViewsCounts);
  } catch (error) {
    res.status(400).json({ message: "algo deu errado!" });
  }
});

export default router;
