import { Request, Response } from "express";
import { addArticleStock } from "../../services/addStock.service";

export const addStock = async (req: Request, res: Response) => {
    const { articleId } = req.params;
    const { quantity } = req.body;

  try {
    const stock = await addArticleStock(
      articleId,
      quantity
    );

    if (!stock) {
      return res
        .status(200)
        .json({ message: "ArticleId no encontrado" });
    }

    return res
      .status(200)
      .json({ message: "Stock agregado correctamente", stock });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al agregar stock", error });
  }
};
