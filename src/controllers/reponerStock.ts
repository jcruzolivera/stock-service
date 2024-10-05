import { Request, Response } from "express";
import { replenish } from "./../helpers/reponerStock";

// Definimos la estructura del objeto devuelto por replenish
interface ReplenishResult {
  success: boolean;
  msg: any;
}


export const replenishStock = async (req: Request, res: Response) => {
  const { articleId } = req.body;
  try {
    const stock: ReplenishResult = await replenish(articleId);

    if (stock.success) {
      return res.status(200).json(stock);
    }
  } catch (error) {
    return res.status(500).json({ message: "Error al reponer stock", error });
  }
};
