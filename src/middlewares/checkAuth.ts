import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Extender la interfaz Request para incluir el campo 'user'
declare module "express-serve-static-core" {
  interface Request {
    user?: string | JwtPayload;
  }
}

const SECRET_KEY = "SECRET_KEY";

// Middleware para validar JWT
export const checkAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Obtener el token del encabezado 'Authorization'
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    res.status(403).json({ message: "Token no enviado" });
    return;
  }

  // Verificar que el encabezado tenga el formato 'Bearer <token>'
  const token = authHeader.split(" ")[1];
  if (!token) {
    res.status(403).json({ message: "Token no válido" });
    return;
  }

  // Verificar el token
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log(err);
      res.status(401).json({ message: "No está autorizado" });
      return;
    }

    // Si el token es válido, almacenar la información decodificada en req.user
    req.user = decoded;
    next(); // Llama al siguiente middleware o controlador
  });
};
