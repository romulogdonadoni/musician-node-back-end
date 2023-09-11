import express from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";
import authToken from "./authToken.js";

router.get("/get/playlist", authToken, async (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];
  const { id: authorId } = jwt.decode(token);
  try {
    const resPlayList = await prisma.playlist.findMany({ where: { authorId: authorId } });
    res.status(200).json(resPlayList);
  } catch (error) {
    res.status(400).json({ message: "algo deu errado!", error });
  }
});

export default router;
