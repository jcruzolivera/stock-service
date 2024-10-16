import Stock from './../models/stock';


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
        // Si no existe el stock, validar con el servicio de Catalogo que el articleId existe
        

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
  