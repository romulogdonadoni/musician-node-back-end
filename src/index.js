import express from "express";
const app = express();
import authRegister from "./routes/authRegister.js";
import authLogin from "./routes/authLogin.js";
import getUsers from "./routes/getUsers.js";
import createMusic from "./routes/createMusic.js";
import createAlbum from "./routes/createAlbum.js";
import getMusic from "./routes/getMusic.js";
import getArtist from "./routes/getArtist.js";
import getAlbum from "./routes/getAlbum.js";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json" assert { type: "json" };
import cors from "cors";
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use("/", authRegister, authLogin, getUsers, createMusic, createAlbum, getMusic, getArtist, getAlbum);

app.listen(process.env.PORT, () => console.log(`Servidor rodando na porta ${process.env.PORT}`));
