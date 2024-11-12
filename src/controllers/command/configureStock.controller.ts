import { Request, Response } from "express";
import { configureArticleStock } from "../../services/configureStock.service";
import { calculateStock } from "../../services/calculateStock.service";

export const configureStock = async (req: Request, res: Response) => {
  const { articleId, currentStock, minStock, repositionQty } = req.body;

  try {
    const stock = await configureArticleStock(
      articleId,
      currentStock,
      minStock,
      repositionQty
    );

    if (!stock) {
      return res.status(200).json({ message: "ArticleId no encontrado" });
    }

    const stockCalculated = await calculateStock(
      articleId as unknown as number
    );

    if (!stockCalculated) {
      return res.status(200).json({ message: "Stock no encontrado" });
    }

    return res
      .status(200)
      .json({ message: "Stock configurado correctamente", stock });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al configurar stock", error });
  }
};
