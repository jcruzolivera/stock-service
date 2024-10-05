import { Request, Response } from "express";
import Stock from './../models/stock';  // Ajusta la ruta según tu estructura de archivos
import MovStock from './../models/movStock';  // Ajusta la ruta según tu estructura de archivos


export const configureStock = async (req: Request, res: Response) => {
    const { articleId, currentStock, minStock, repositionQty } = req.body;

  
    try {
      let stock = await Stock.findOne({ articleId });
  
      if (stock) {
        // Actualizar el stock existente
        stock.currentStock = currentStock;
        stock.minStock = minStock;
        stock.repositionQty = repositionQty;
        await stock.save();
      } else {
        // Crear nuevo stock
        stock = await Stock.create({
          articleId,
          currentStock,
          minStock,
          repositionQty,
        });
      }
  
      return res.status(200).json({ message: 'Stock configurado correctamente', stock });
    } catch (error) {
      return res.status(500).json({ message: 'Error al configurar stock', error });
    } 
  };
  