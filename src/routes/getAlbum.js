import express from "express";
const router = express.Router();
import authToken from "./authToken.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken"

router.get("/get/self/album", authToken, async (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];
  const { id: authorId } = jwt.decode(token);
  try {
    const resAlbum = await prisma.album.findMany({ where: { authorId: authorId } });
    res.status(200).json(resAlbum);
  } catch (error) {
    res.status(400).json({ message: "algo deu errado!" });
  }
});
router.get("/get/album", async (req, res) => {
  try {
    const resAlbum = await prisma.album.findMany();
    res.status(200).json(resAlbum);
  } catch (error) {
    res.status(400).json({ message: "algo deu errado!" });
  }
});
router.get("/get/album/:id", async (req, res) => {
  const id = req.params["id"];
  try {
    const resAlbum = await prisma.album.findUnique({
      where: { id: id },
      include: { music: { include: { _count: { select: { musicViews: true } } } } },
    });

    res.status(200).json(resAlbum);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "algo deu errado!" });
  }
});
export default router;
