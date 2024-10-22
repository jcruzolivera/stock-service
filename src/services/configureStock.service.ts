import Stock from "./../models/stock";
import getArticleById from "./../rest/getArticleById";

export const configureArticleStock = async (
  articleId: string,
  currentStock: number,
  minStock: number,
  repositionQty: number
) => {
  try {
    let stock = await Stock.findOne({ articleId });

    if (stock) {
      // Actualizar el stock existente
      stock.currentStock = currentStock;
      stock.minStock = minStock;
      stock.repositionQty = repositionQty;
      await stock.save();
    } else {
      // Si no existe el stock, validar con el servicio de Catalogo que el articleId existe
      const result = await getArticleById(articleId);

      if (!result.valid) {
        console.log(result.msg); // Mostrar mensaje de que el artículo no existe
        return null; // Retornar null si no existe
      }

      // Crear nuevo stock
      stock = await Stock.create({
        articleId,
        currentStock,
        minStock,
        repositionQty,
      });
    }

    return stock;
  } catch (error) {
    console.log(error);
    return null;
  }
};
