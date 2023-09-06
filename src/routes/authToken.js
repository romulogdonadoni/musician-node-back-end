import jwt from "jsonwebtoken";

const authToken = (req, res, next) => {
  const bearer = req.headers.authorization;
  const token = bearer.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).json({ message: "Não autorizado" });
  }
};
export default authToken;
