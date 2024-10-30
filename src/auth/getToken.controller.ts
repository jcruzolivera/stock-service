import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'SECRET_KEY';

export const getToken = (req: Request, res: Response): void => {
  const user = { id: 1, name: 'User1' }; // Datos de ejemplo del usuario
  const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });

  res.json({ token }); // Devuelve el token al cliente
};
