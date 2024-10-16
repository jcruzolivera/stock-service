import Stock from "../models/stock";
import MovStock from "../models/movStock";
import { replenish } from "./../helpers/replenishStock.helper";

export const validateArticleStock = async (
  articleId: number,
  quantity: number
) => {
  try {
    const stock = await Stock.findOne({ articleId });

    if (!stock) {
      return null;
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

      return stock;
    } else {
      return { msg: "No hay suficiente stock para la orden" };
    }
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
};
