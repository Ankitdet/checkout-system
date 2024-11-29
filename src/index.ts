import { Checkout } from "./services/checkout";
import { appleTVRule } from "./rules/apple-tv-rule";
import { productCatalog } from "./catalogs/product-catalog";
import { superIPadRule } from "./rules/super-ipad-rule";

// Set up the product catalog
Checkout.setProductCatalog(productCatalog);

// Define pricing rules
const pricingRules = [appleTVRule, superIPadRule];

// Checkout example 1
const co1 = new Checkout(pricingRules);
co1.scan("vga");
console.log("Total: " + co1.total());

// // Checkout example 2
const co2 = new Checkout(pricingRules);
co2.scan("atv");
co2.scan("atv");
co2.scan("atv");
co2.scan("atv");
co2.scan("atv");
co2.scan("atv");
console.log("Total: " + co2.total());
