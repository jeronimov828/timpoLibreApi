import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = "secreto_super_seguro";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).json({ msg: "Acceso denegado" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.body = decoded;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token no válido" });
  }
};