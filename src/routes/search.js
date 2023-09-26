import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = express.Router();

router.get("/search/:name?/:type?", async (req, res) => {
  const { type, name } = req.params;
  if (type == "album") {
    try {
      const result = await prisma.album.findMany({ where: { name: { contains: name, mode: "insensitive" } } });
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: error });
    }
  } else if (type == "music") {
    try {
      const result = await prisma.music.findMany({ where: { name: { contains: name, mode: "insensitive" } } });
      console.log(result);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: error });
    }
  } else if (type == "artist") {
    try {
      const result = await prisma.user.findMany({ where: { username: { contains: name, mode: "insensitive" }, role: "ARTIST" } });
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: error });
    }
  } else {
    try {
      const music = await prisma.music.findMany({ where: { name: { contains: name, mode: "insensitive" } } });
      const album = await prisma.album.findMany({ where: { name: { contains: name, mode: "insensitive" } } });
      const artist = await prisma.user.findMany({ where: { username: { contains: name, mode: "insensitive" }, role: "ARTIST" } });
      res.status(200).json({ music: music, album: album, artist: artist });
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: error });
    }
  }
});

export default router;
