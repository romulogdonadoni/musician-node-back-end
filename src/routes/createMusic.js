import express from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import multer from "multer";
import cloudinary from "../config/cloudinaryConfig.js";
import jwt from "jsonwebtoken";
const upload = multer();

router.post(
  "/create/music",
  upload.fields([
    { name: "music", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  async (req, res) => {
    const token = req.headers["authorization"].split(" ")[1];
    const { id: authorId } = jwt.decode(token);
    console.log(authorId);
    const { authorName, name, description, releaseDate } = req.body;
    const fieldImage = req.files["image"][0];
    const fieldMusic = req.files["music"][0];

    const uploadImage = (imageBuffer) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ resource_type: "auto" }, (error, result) => {
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
    console.log(imageUrl);

    const uploadMusic = (musicBuffer) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ resource_type: "auto" }, (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result.url);
            }
          })
          .end(musicBuffer);
      });
    };
    const musicUrl = await uploadMusic(fieldMusic.buffer);
    console.log(musicUrl);

    const newMusic = await prisma.music.create({
      data: {
        imageUrl: imageUrl,
        authorName: authorName,
        name: name,
        description: description,
        releaseDate: releaseDate,
        musicUrl: musicUrl,
        authorId: authorId,
      },
    });
    res.status(200).json(newMusic);
  }
);

export default router;
