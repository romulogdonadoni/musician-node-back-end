import express from "express";
const app = express();

import authRegister from "./routes/authRegister.js";
import authLogin from "./routes/authLogin.js";

import createMusic from "./routes/createMusic.js";
import createAlbum from "./routes/createAlbum.js";
import createPlaylist from "./routes/createPlaylist.js";
import createComment from "./routes/createComment.js";

import getUsers from "./routes/getUsers.js";
import getMusic from "./routes/getMusic.js";
import getArtist from "./routes/getArtist.js";
import getAlbum from "./routes/getAlbum.js";
import getPlayList from "./routes/getPlayList.js";

import search from "./routes/search.js";

import cors from "cors";

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(
  "/",
  authRegister,
  authLogin,
  getUsers,
  createMusic,
  createAlbum,
  createPlaylist,
  createComment,
  getMusic,
  getArtist,
  getAlbum,
  getPlayList,
  search
);

app.listen(process.env.PORT, () => console.log(`Servidor rodando na porta ${process.env.PORT}`));
