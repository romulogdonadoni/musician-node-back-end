import express from "express";
import { PrismaClient } from "@prisma/client";
import multer from "multer";
import cloudinary from "../config/cloudinaryConfig.js";
import authToken from "./authToken.js";

const prisma = new PrismaClient();
const router = express.Router();
const upload = multer();

router.post(
  "/create/music/:id",
  authToken,
  upload.fields([
    { name: "music", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  async (req, res) => {
    const authorId = req.params["id"];
    const { authorName, name, description, releaseDate } = req.body;
    const fieldImage = req.files["image"][0];
    const fieldMusic = req.files["music"][0];

    const uploadImage = (imageBuffer) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ resource_type: "image", folder: "MusicsImages" }, (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result.url);
            }
          })
          .end(imageBuffer);
      });
    };
    const uploadMusic = (musicBuffer) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ resource_type: "video", folder: "Musics" }, (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result.url);
            }
          })
          .end(musicBuffer);
      });
    };
    
    const [imageUrl, musicUrl] = await Promise.all([uploadImage(fieldImage.buffer), uploadMusic(fieldMusic.buffer)]);

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
