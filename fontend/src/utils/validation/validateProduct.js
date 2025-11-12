// utils/validation/validateProduct.js
export function validateProduct(product) {
    const { name, price, quantity, description, category } = product;
    const categories = ["Electronics", "Books", "Clothing", "Toys", "Furniture"];

  if (!name || name.trim().length < 3 || name.length > 100) {
    return { valid: false, message: "Product name must be 3-100 characters" };
  }

  if (price == null || price <= 0) {
    return { valid: false, message: "Price must be greater than 0" };
  }
  if (price > 999_999_999) {
    return { valid: false, message: "Price must be <= 999,999,999" };
  }

  if (quantity == null || quantity < 0) {
    return { valid: false, message: "Quantity cannot be negative" };
  }
  if (quantity > 99_999) {
    return { valid: false, message: "Quantity must be <= 99,999" };
  }

  if (description && description.length > 500) {
    return { valid: false, message: "Description cannot exceed 500 characters" };
  }

  if (!category || !categories.includes(category)) {
    return { valid: false, message: "Category is invalid" };
  }

  return { valid: true, message: "Product is valid" };
}