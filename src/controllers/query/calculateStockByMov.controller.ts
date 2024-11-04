import { Request, Response } from "express";
import { calculateStock } from "../services/calculateStock.service";

export const calculateStockFromMovements = async (
  req: Request,
  res: Response
) => {
  const { articleId } = req.params;

  try {
    const stock = await calculateStock(articleId as unknown as number);

    if (!stock) {
      return res.status(200).json({ message: "Stock no encontrado" });
    }

    return res.status(200).json({ stock });
  } catch (error) {
    return res.status(500).json({ message: "Error al calcular stock", error });
  }
};
