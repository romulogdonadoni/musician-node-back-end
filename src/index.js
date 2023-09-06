import express from "express";
const app = express();
const port = 3000;
import authRegister from "./routes/authRegister.js";
import authLogin from "./routes/authLogin.js";
import getUsers from "./routes/getUsers.js";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json" assert { type: "json" };

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use("/", authRegister, authLogin, getUsers);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
