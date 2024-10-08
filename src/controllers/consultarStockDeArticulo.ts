import { Request, Response } from "express";
import Stock from './../models/stock';  // Ajusta la ruta según tu estructura de archivos
import { getArticleStock } from "../services/getStock";

export const getStockByArticleId = async (req: Request, res: Response) => {
    const { articleId } = req.params;
    try {
      const stock = getArticleStock(articleId as unknown as number);
  
      return res.status(200).json(stock);
    } catch (error) {
      return res.status(500).json({ message: 'Error al consultar stock', error });
    }
  };
  