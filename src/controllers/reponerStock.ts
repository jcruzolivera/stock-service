import { Request, Response } from "express";
import { replenishArticleStock } from "../services/replenishStock";

// Define la interfaz para el tipo de datos que esperas en req.body
interface ReplenishStockRequest extends Request {
  body: {
    articleId: string;
  };
}

export const replenishStock = async (
  req: ReplenishStockRequest,
  res: Response
) => {
  const { articleId } = req.body;
  try {
    const stock = await replenishArticleStock(articleId as unknown as number);

    if (stock) {
      return res.status(200).json(stock);
    }
  } catch (error) {
    return res.status(500).json({ message: "Error al reponer stock", error });
  }
};
