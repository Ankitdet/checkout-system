// tests/services/checkout.test.ts

import { Checkout } from "../../src/services/checkout";
import { appleTVRule } from "../../src/rules/apple-tv-rule";
import { superIPadRule } from "../../src/rules/super-ipad-rule";
import { Product } from "../../src/models/product";

describe("Checkout Service", () => {
    const productCatalog: Record<string, Product> = {
        atv: { name: "Apple TV", price: 109.5 },
        ipd: { name: "Super iPad", price: 549.99 },
        mbp: { name: "MacBook Pro", price: 1399.99 },
        vga: { name: "VGA adapter", price: 30.0 },
    };

    beforeAll(() => {
        Checkout.setProductCatalog(productCatalog);
    });

    it("should calculate total with Apple TV 3-for-2 deal", () => {
        const co = new Checkout([appleTVRule]);
        co.scan("atv");
        co.scan("atv");
        co.scan("atv");
        co.scan("vga");
        expect(co.total()).toBe(`$249`); // 2 * 109.5 + 30
    });

    it("should calculate total with Super iPad bulk discount", () => {
        const co = new Checkout([superIPadRule]);
        co.scan("ipd");
        co.scan("ipd");
        co.scan("ipd");
        co.scan("ipd");
        co.scan("ipd");
        expect(co.total()).toBe(`$2499.95`); // 5 * 499.99
    });

    it("should calculate total with multiple pricing rules applied", () => {
        const co = new Checkout([appleTVRule, superIPadRule]);
        co.scan("atv");
        co.scan("ipd");
        co.scan("ipd");
        co.scan("ipd");
        co.scan("atv");
        co.scan("ipd");
        co.scan("ipd");
        co.scan("atv");
        expect(co.total()).toBe(`$2718.95`); // Apple TV: 2 * 109.5, Super iPad: 5 * 499.99
    });

    it("should handle no applicable discounts", () => {
        const co = new Checkout([]);
        co.scan("mbp");
        co.scan("vga");
        expect(co.total()).toBe(`$1429.99`); // 1399.99 + 30
    });
});
