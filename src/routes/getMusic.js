import express from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

router.get("/get/music", async (req, res) => {
  try {
    const resMusic = await prisma.music.findMany({ include: { _count: { select: { musicViews: true } } } });

    res.status(200).json(resMusic);
  } catch (error) {
    res.status(400).json({ message: "algo deu errado!" });
  }
});
router.get("/get/music/:id", async (req, res) => {
  const id = req.params["id"];
  try {
    const resMusic = await prisma.music.findUnique(
      { where: { id: id }, include: { comment: { select: { user: { select: { username: true, image: true } }, comment: true } } } },
      { include: { _count: { select: { musicViews: true } } } }
    );

    res.status(200).json(resMusic);
  } catch (error) {
    res.status(400).json({ message: "algo deu errado!" });
  }
});

export default router;
