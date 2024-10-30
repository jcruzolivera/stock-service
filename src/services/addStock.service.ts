import MovStock from "./../models/movStock";

export const addArticleStock = async (articleId: string, quantity: number) => {
  try {
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
