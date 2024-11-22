import { replenish } from "./../helpers/replenishStock.helper";

// Interfaz para definir la estructura del objeto devuelto por replenish()
interface ReplenishResult {
  success: boolean;
  msg: any;
}

export const replenishArticleStock = async (articleId: string) => {
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
