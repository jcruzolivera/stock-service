import { Request, Response } from "express";
import Stock from './../models/stock';  // Ajusta la ruta según tu estructura de archivos

export const getStockByArticleId = async (req: Request, res: Response) => {
    const { articleId } = req.params;
    try {
      const stock = await Stock.findOne({ articleId });
  
      if (!stock) {
        return res.status(404).json({ message: 'Stock no encontrado' });
      }
  
      return res.status(200).json({
        currentStock: stock.currentStock,
        minStock: stock.minStock,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Error al consultar stock', error });
    }
  };
  