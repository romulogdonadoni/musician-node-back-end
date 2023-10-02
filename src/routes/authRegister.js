import express from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import multer from "multer";
const upload = multer();
import fs from 'fs'
router.post("/auth/register", upload.single("image"), async (req, res) => {
  const { email, username, password, role } = req.body;
  const buffer = req.file.buffer

  try {
    const newUser = await prisma.user.create({ data: { image: buffer, username: username, password: password, email: email, role: role } });
    try {
      await prisma.library.create({ data: { authorId: newUser.id } });
      res.status(200).json({ message: "Usuário criado com sucesso", user: newUser });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Usuário já existente", error });
  }
});

export default router;
