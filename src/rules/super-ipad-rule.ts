import { PricingRule } from "../models/pricing-rule";
import { Checkout } from "../services/checkout";

export const superIPadRule: PricingRule = {
  apply: (items) => {
    const productCatalog = Checkout.productCatalog;

    const ipadItems = items.filter(item => item === "ipd");
    const count = ipadItems.length;

    if (count === 0) return { price: 0, discountedItems: [] }; // No Super iPads scanned

    const regularPrice = productCatalog["ipd"].price;
    const discountedPrice = 499.99;

    // Apply bulk discount for more than 4 items
    const price = count > 4 ? discountedPrice : regularPrice;

    // Total price for Super iPads
    const total = count * price;

    return {
      price: total,
      discountedItems: ipadItems // List of Super iPad items handled by this rule
    };
  },
};
