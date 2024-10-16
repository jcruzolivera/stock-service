import Stock from "./../models/stock";
import MovStock from "./../models/movStock";

// Interfaz para definir la estructura del objeto devuelto por replenish ()
interface ReplenishResult {
  success: boolean;
  msg: any;
}

export const replenish = async (
  articleId: number
): Promise<ReplenishResult> => {
  try {
    const stock = await Stock.findOne({ articleId });

    if (!stock) {
      return {
        msg: "Stock no encontrado para el artículo con id " + articleId,
        success: false,
      };
    }

    const repositionQty = stock.repositionQty || 0;
    //Si el stock mínimo no esta definido, debe ser igual a 0
    const minStock = stock.minStock || 0;

    // Si la cantidad a reponer no esta definida o es cero, no reponer stock.
    if (repositionQty <= 0) {
      return {
        msg: "Cantidad de reposición igual a 0. No se puede reponer stock",
        success: true,
      };
    }

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
