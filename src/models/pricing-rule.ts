export interface PricingRule {
    apply: (items: string[]) => { price: number, discountedItems: string[] };
}
