import express from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";
import authToken from "./authToken.js";

router.post("/create/playlist", authToken, async (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];
  const { id: authorId } = jwt.decode(token);
  const { name } = req.body;

  const newPlaylist = await prisma.playlist.create({
    data: {
      name: name,
      authorId: authorId,
    },
  });
  res.status(200).json(newPlaylist);
});

export default router;
