import { Product } from "../models/product";

export const productCatalog: Record<string, Product> = {
  ipd: { name: "Super iPad", price: 549.99 },
  mbp: { name: "MacBook Pro", price: 1399.99 },
  atv: { name: "Apple TV", price: 109.50 },
  vga: { name: "VGA adapter", price: 30.00 },
};

// 219 + 1,649.97