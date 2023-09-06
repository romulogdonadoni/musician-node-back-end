import express from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

router.post("/auth/register", async (req, res) => {
  const { email, username, password, role } = req.body;
  try {
    const newUser = await prisma.user.create({ data: { username: username, password: password, email: email, role: role } });
    res.status(200).json({ message: "Usuário criado com sucesso", user: newUser });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Usuário já existente", error });
  }
});

export default router;
