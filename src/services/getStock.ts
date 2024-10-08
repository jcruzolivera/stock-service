import Stock from './../models/stock';  // Ajusta la ruta según tu estructura de archivos

export const getArticleStock = async (articleId: number) => {
    try {
      const stock = await Stock.findOne({ articleId });
  
      if (!stock) {
        return null;
    }
  
      return ({
        currentStock: stock.currentStock,
        minStock: stock.minStock,
      });
    } catch (error) {
      return null;
    }
  };
  