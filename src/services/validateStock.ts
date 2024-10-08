import Stock from "./../models/stock"; // Ajusta la ruta según tu estructura de archivos
import MovStock from "./../models/movStock"; // Ajusta la ruta según tu estructura de archivos
import { replenish } from "./../helpers/reponerStock";

export const validateArticleStock = async (articleId: number, quantity: number) => {
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
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
