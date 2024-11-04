import { Request, Response } from "express";
import { getArticleStock } from "../../services/getStock.service";
import { calculateStock } from "../../services/calculateStock.service";

export const getStockByArticleId = async (req: Request, res: Response) => {
  const { articleId } = req.params;

  try {
    const stockCalculated = await calculateStock(
      articleId as unknown as number
    );

    if (!stockCalculated) {
      return res.status(200).json({ message: "Stock no encontrado" });
    }

    const stock = await getArticleStock(articleId as unknown as number);

    return res.status(200).json(stock);
  } catch (error) {
    return res.status(500).json({ message: "Error al consultar stock", error });
  }
};
