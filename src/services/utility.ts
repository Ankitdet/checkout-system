import { Checkout } from "../services/checkout";

export function getRemainingItemsPrice(items: string[], discountedItems: string[]): number {
  const productCatalog = Checkout.productCatalog;

  // Filter out the discounted items
  const remainingItems = items.filter(item => !discountedItems.includes(item));

  // Calculate the total price of remaining items
  return remainingItems.reduce((total, item) => {
    const product = productCatalog[item];
    return total + (product ? product.price : 0); // Add the price if the item exists in the catalog
  }, 0);
}
