import { PricingRule } from "../models/pricing-rule";
import { Product } from "../models/product";
import { getRemainingItemsPrice } from "./utility";

export class Checkout {
  private scannedItems: string[] = [];
  private pricingRules: PricingRule[];
  public static productCatalog: Record<string, Product>;

  constructor(pricingRules: PricingRule[]) {
    this.pricingRules = pricingRules;
  }

  static setProductCatalog(catalog: Record<string, Product>): void {
    Checkout.productCatalog = catalog;
  }

  scan(item: string): void {
    this.scannedItems.push(item);
  }

  total(): string {
    let total = 0;
    console.log(`Scanned Items: ${this.scannedItems.join(',')}`)
    let discountedItems: string[] = [];
    // Apply pricing rules and track discounted items
    this.pricingRules.forEach(rule => {
      const result = rule.apply(this.scannedItems);
      total += result.price;
      discountedItems = [...discountedItems, ...result.discountedItems];
    });
    // Calculate the price for remaining items
    const remainingItemsTotal = getRemainingItemsPrice(this.scannedItems, discountedItems);
    return `$${total + remainingItemsTotal}`;
  }

}
