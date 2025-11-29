class ProductPage {
  visit() {
    cy.visit('/products');
  }

  // Nút Add to Cart trong card (ProductCard.jsx có <button>)
  clickAddToCart(index = 0) {
    cy.get('.product-card button').eq(index).click();
  }

  // Form sản phẩm (ProductForm.jsx có data-testid="product-form")
  getForm() {
    return cy.get('[data-testid="product-form"]');
  }

  fillProductForm(product) {
    cy.get('input[aria-label="Ten san pham"]').clear().type(product.name);
    cy.get('input[aria-label="Gia"]').clear().type(product.price);
    cy.get('input[aria-label="So luong"]').clear().type(product.quantity);
  }

  // Thông báo thành công (ProductForm.jsx có <p role="alert">)
  getSuccessMessage() {
    return cy.get('[role="alert"]');
  }

  // Lấy sản phẩm trong danh sách theo tên (ProductList.jsx có data-testid="product-item")
  getProductInList(name) {
    return cy.contains('[data-testid="product-item"]', name);
  }

  // Error trong ProductList.jsx
  getErrorList() {
    return cy.get('[data-testid="error-list"]');
  }

  // Chi tiết sản phẩm (ProductDetail.jsx có data-testid="product-name" và "product-price")
  getProductName() {
    return cy.get('[data-testid="product-name"]');
  }

  getProductPrice() {
    return cy.get('[data-testid="product-price"]');
  }
}

export default ProductPage;
