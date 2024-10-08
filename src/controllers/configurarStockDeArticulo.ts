import { Request, Response } from "express";
import { configureArticleStock } from "../services/configureStock";


export const configureStock = async (req: Request, res: Response) => {
    const { articleId, currentStock, minStock, repositionQty } = req.body;

  
    try {
      const stock = await configureArticleStock(articleId, currentStock, minStock, repositionQty);
  
      return res.status(200).json({ message: 'Stock configurado correctamente', stock });
    } catch (error) {
      return res.status(500).json({ message: 'Error al configurar stock', error });
    } 
  };
  