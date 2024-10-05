import { Request, Response } from "express";
import Stock from "./../models/stock"; // Ajusta la ruta según tu estructura de archivos
import MovStock from "./../models/movStock"; // Ajusta la ruta según tu estructura de archivos

export const calculateStockFromMovements = async (
  req: Request,
  res: Response
) => {
  const { articleId } = req.params;

  try {
    const movements = await MovStock.find({ articleId }).sort({
      creationDate: 1,
    });

    //Ver si es necesario tener una valor de stock inicial para asignar a currentStock
    //y no necesariamente incializarlo en 0
    let currentStock = 0;
    movements.forEach((mov) => {
      if (mov.movType === "INCR") {
        currentStock += mov.quantity;
      } else if (mov.movType === "DECR") {
        currentStock -= mov.quantity;
      }
    });

    const stock = await Stock.findOneAndUpdate(
      { articleId },
      { currentStock },
      { new: true }
    );

    return res.status(200).json({ stock });
  } catch (error) {
    return res.status(500).json({ message: "Error al calcular stock", error });
  }
};
