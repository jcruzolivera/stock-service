import { Request, Response } from "express";
import { getArticleStock } from "../../services/getStock.service";

export const getStockByArticleId = async (req: Request, res: Response) => {
  const { articleId } = req.params;

  try {
    const stock = await getArticleStock(articleId as unknown as number);

    return res.status(200).json(stock);
  } catch (error) {
    return res.status(500).json({ message: "Error al consultar stock", error });
  }
};
