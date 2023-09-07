import express from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import multer from "multer";
import cloudinary from "../config/cloudinaryConfig.js";
import jwt from "jsonwebtoken";
import authToken from "./authToken.js";
const upload = multer();

router.post("/create/album", authToken, upload.fields([{ name: "image", maxCount: 1 }]), async (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];
  const { id: authorId } = jwt.decode(token);
  const { authorName, name, description, releaseDate } = req.body;
  const fieldImage = req.files["image"][0];

  const uploadImage = (imageBuffer) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: "image", folder: "AlbumsImages" }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.url);
          }
        })
        .end(imageBuffer);
    });
  };
  const imageUrl = await uploadImage(fieldImage.buffer);

  const newAlbum = await prisma.album.create({
    data: {
      imageUrl: imageUrl,
      authorName: authorName,
      name: name,
      description: description,
      releaseDate: releaseDate,
      authorId: authorId,
    },
  });
  res.status(200).json(newAlbum);
});

export default router;
