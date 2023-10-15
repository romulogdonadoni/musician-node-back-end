import express from "express";
import authToken from "./authToken.js";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
const router = express.Router();
const prisma = new PrismaClient();
router.post("/create/comment/:musicId", authToken, async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const musicId = req.params["musicId"];
  const { id: userId } = jwt.decode(token);
  const { comment } = req.body;

  try {
    const newComment = await prisma.comment.create({ data: { comment: comment, musicId: musicId, userId: userId } });
    res.status(201).json(newComment);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
});

export default router;