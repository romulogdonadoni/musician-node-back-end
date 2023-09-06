import express from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";

router.post("/auth/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const resUser = await prisma.user.findFirst({ where: { username: username } });
    if (resUser.password === password) {
      const token = jwt.sign({ id: resUser.id }, process.env.JWT_SECRET);
      res.status(200).json({ token: token });
    } else {
      res.status(401).json({ message: "Não autorizado" });
    }
  } catch (error) {
    res.status(400).json({ message: "Usuário não encontrado", error: error });
  }
});

export default router;
