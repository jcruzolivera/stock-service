import Stock from "./../models/stock"; // Ajusta la ruta según tu estructura de archivos
import MovStock from "./../models/movStock"; // Ajusta la ruta según tu estructura de archivos

export const calculateStock = async (articleId: number) => {
  try {
    const movements = await MovStock.find({ articleId }).sort({
      creationDate: 1,
    });

    //Ver si es necesario tener una valor de stock inicial para asignar a currentStock
    //y no necesariamente incializarlo en 0
    let currentStock = 0;
    movements.forEach((mov) => {
      if (mov.movType === "INCR") {
        currentStock += mov.quantity;
      } else if (mov.movType === "DECR") {
        currentStock -= mov.quantity;
      }
    });

    const stock = await Stock.findOneAndUpdate(
      { articleId },
      { currentStock },
      { new: true }
    );

    return stock;
  } catch (error) {
    console.log(error);
    return null;
  }
};
