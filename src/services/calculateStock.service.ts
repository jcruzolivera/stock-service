import Stock from "../models/stock";
import MovStock from "../models/movStock";

export const calculateStock = async (articleId: number) => {
  try {

    const stockFound = await Stock.findOne({ articleId });

    if (!stockFound) {
      return null;
    }
    const movements = await MovStock.find({ articleId }).sort({
      creationDate: 1,
    });

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
