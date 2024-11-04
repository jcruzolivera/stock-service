import MovStock from "./../models/movStock";
import Stock from "./../models/stock";

export const addArticleStock = async (articleId: string, quantity: number) => {
  try {
    const stockFound = await Stock.findOne({ articleId });

    if (!stockFound) {
      return null;
    }

    let movStock = await MovStock.create({
      articleId,
      movType: "INCR",
      quantity,
      description: "Add stock manually",
      creationUser: "sistema",
    });

    return movStock;
  } catch (error) {
    console.log(error);
    return null;
  }
};
