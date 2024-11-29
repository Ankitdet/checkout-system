import { PricingRule } from "../models/pricing-rule";
import { Checkout } from "../services/checkout";

export const appleTVRule: PricingRule = {
    apply: (items) => {
        const productCatalog = Checkout.productCatalog;
        const appleTVItems = items.filter(item => item === "atv");
        const count = appleTVItems.length;

        // No Apple TVs scanned
        if (count === 0) return { price: 0, discountedItems: [] };

        const price = productCatalog["atv"].price;

        // Calculate discount: "3 for 2" deal
        // Number of 3-item groups eligible for discount
        const discountedSets = Math.floor(count / 3);
        // Remaining items outside the discount
        const regularItems = count % 3;
        // Total discounted price for Apple TVs
        const total = discountedSets * 2 * price + regularItems * price;

        return {
            price: total,
            discountedItems: appleTVItems
        };
    },
};
