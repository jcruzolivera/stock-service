import Stock from "./../models/stock";

export const getArticleStock = async (articleId: number) => {
  try {
    const stock = await Stock.findOne({ articleId });

    if (!stock) {
      return {
        msg: "Stock no encontrado para el artículo con id " + articleId,
      };
    }

    return {
      currentStock: stock.currentStock,
      minStock: stock.minStock,
    };
  } catch (error) {
    return null;
  }
};
