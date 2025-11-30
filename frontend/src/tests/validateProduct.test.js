
import { validateProduct} from "../utils/validation/validateProduct";

    describe("validateProducts()", () => {
        let product;
        beforeEach(() => {
    // setup valid product before each test
    product = { name: "Laptop", price: 1000, quantity: 10, description: "Good laptop", category: "Electronics" };
    });

    test("should fail when product name is empty", () => {
        product.name="";
        const result = validateProduct(product);
        expect(result.valid).toBe(false);    //thực tế và mong đợi
        expect(result.message).toBe("Product name must be 3-100 characters");
    });

    test("should fail when product name is too short", () => {
        product.name="ab";
        const result = validateProduct(product);
        expect(result.valid).toBe(false);
        expect(result.message).toBe("Product name must be 3-100 characters");
    });

    test("should fail when product name is too long", () => {
        product.name="a".repeat(101);
        const result = validateProduct(product);
        expect(result.valid).toBe(false);
        expect(result.message).toBe("Product name must be 3-100 characters");
    });

    test("should fail when product price is null", () => {
        product.price = null;
        const result = validateProduct(product);
        expect(result.valid).toBe(false);
        expect(result.message).toBe("Price must be greater than 0");
    });

    test("should fail when product price is 0", () => {
        product.price = 0;
        const result = validateProduct(product);
        expect(result.valid).toBe(false);
        expect(result.message).toBe("Price must be greater than 0");
    });

    test("should fail when product price is too long", () => {
        product.price = 9999999999;
        const result = validateProduct(product);
        expect(result.valid).toBe(false);
        expect(result.message).toBe("Price must be <= 999,999,999");
    });

    test("should fail when product quantity is null", () => {
        product.quantity = null;
        const result = validateProduct(product);
        expect(result.valid).toBe(false);
        expect(result.message).toBe("Quantity cannot be negative");
    });

    test("should fail when product quantity is negative", () => {
        product.quantity = -1;
        const result = validateProduct(product);
        expect(result.valid).toBe(false);
        expect(result.message).toBe("Quantity cannot be negative");
    });

    test("should fail when product quantity too large", () => {
        product.quantity = 1000000;
        const result = validateProduct(product);
        expect(result.valid).toBe(false);
        expect(result.message).toBe("Quantity must be <= 99,999");
    });

    test("should fail when product description is too long", () => {
        product.description = "a".repeat(501);
        const result = validateProduct(product);
        expect(result.valid).toBe(false);
        expect(result.message).toBe("Description cannot exceed 500 characters");
    });

    test("should fail when product category is invalid", () => {
        product.category = "i";
        const result = validateProduct(product);
        expect(result.valid).toBe(false);
        expect(result.message).toBe("Category is invalid");
    });

    test("should pass when product is valid", () => {
        const result = validateProduct(product);
        expect(result.valid).toBe(true);
        expect(result.message).toBe("Product is valid");
        });
    });