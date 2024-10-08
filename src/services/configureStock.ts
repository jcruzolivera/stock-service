import Stock from './../models/stock';  // Ajusta la ruta según tu estructura de archivos


export const configureArticleStock = async (articleId: number, currentStock: number, minStock: number, repositionQty: number) => {
  
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
  
      return stock;
    } catch (error) {
      console.log(error);
      return null;
    } 
  };
  