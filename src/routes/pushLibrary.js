import express from "express";
import authToken from "./authToken";
import { PrismaClient } from "@prisma/client";
const router = express.Router();
const prisma = new PrismaClient();

router.patch("/push/library/:id", authToken, async (req, res) => {
  const id = req.params["id"];

    try{
        const createLibrary 
    }

  const updateLibrary = prisma.library.update({ where: { id: id }, data: {} });
  res.status(200).json();
});
