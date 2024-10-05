import Stock from "./../models/stock"; // Ajusta la ruta según tu estructura de archivos
import MovStock from "./../models/movStock"; // Ajusta la ruta según tu estructura de archivos


// Definimos la estructura del objeto devuelto por replenish
interface ReplenishResult {
    success: boolean;
    msg: any;
  }

export const replenish = async (articleId: number): Promise<ReplenishResult> => {
  try {
    const stock = await Stock.findOne({ articleId });

    if (!stock) {
      return {
        msg: "Stock no encontrado para el artículo con id " + articleId,
        success: false,
      };
    }

    const repositionQty = stock.repositionQty || 0;
    const minStock = stock.minStock || 0;

    // Verificamos si el stock es menor o igual al mínimo configurado
    if (stock.currentStock <= minStock) {
      await MovStock.create({
        articleId,
        movType: "INCR",
        quantity: repositionQty,
        description: "Reposición automática de stock",
        creationUser: "sistema",
      });

      stock.currentStock += repositionQty;
      await stock.save();

      return {
        msg: stock,
        success: true,
      };
    } else {
      return {
        msg: "No es necesario reponer stock",
        success: true,
      };
    }
  } catch (error) {
    return {
      msg: error,
      success: false,
    };
  }
};
