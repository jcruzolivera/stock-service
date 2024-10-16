import { Request, Response } from "express";
import { validateArticleStock } from "../services/validateStock.service";

export const validateStock = async (req: Request, res: Response) => {
  const { articleId, quantity } = req.body;

  try {
    const stock = await validateArticleStock(articleId, quantity);

    return res.status(200).json(stock);
  } catch (error) {
    return res.status(500).json({ message: "Error al validar stock", error });
  }
};
