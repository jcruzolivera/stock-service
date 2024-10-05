import { Request, Response } from "express";
import Stock from './../models/stock';  // Ajusta la ruta según tu estructura de archivos
import MovStock from './../models/movStock';  // Ajusta la ruta según tu estructura de archivos
import { replenish } from "./../helpers/reponerStock";

export const validateStock = async (req: Request, res: Response) => {
  const { articleId, quantity } = req.body;

  try {
    const stock = await Stock.findOne({ articleId });

    if (!stock) {
      return res
        .status(404)
        .json({ valid: false, message: "Stock no encontrado" });
    }

    if (stock.currentStock >= quantity) {
      // Disminuir stock
      await MovStock.create({
        articleId,
        movType: "DECR",
        quantity,
        description: "Disminución por validación de orden",
        creationUser: "sistema",
      });

      stock.currentStock -= quantity;
      await stock.save();

      // Validar si hay que reponer el stock
      if (stock.currentStock <= stock.minStock) {
        await replenish(articleId); // Llama a la reposición
      }

      return res.status(200).json({ valid: true, stock });
    } else {
      return res
        .status(200)
        .json({ valid: false, message: "Stock insuficiente" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error al validar stock", error });
  }
};
