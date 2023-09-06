import express from "express";
const app = express();
import authRegister from "./routes/authRegister.js";
import authLogin from "./routes/authLogin.js";
import getUsers from "./routes/getUsers.js";
import createMusic from "./routes/createMusic.js";
import getMusic from "./routes/getMusic.js";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json" assert { type: "json" };

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use("/", authRegister, authLogin, getUsers, createMusic, getMusic);

app.listen(process.env.PORT, () => console.log(`Servidor rodando na porta ${process.env.PORT}`));
