import { replenish } from "./../helpers/reponerStock";

// Definimos la estructura del objeto devuelto por replenish
interface ReplenishResult {
  success: boolean;
  msg: any;
}

export const replenishArticleStock = async (articleId: number) => {
  try {
    const stock: ReplenishResult = await replenish(articleId);

    if (stock.success) {
      return stock;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
