class ProductPage {
  visit() {
    cy.visit('/products');
  }

  // Grid danh sách sản phẩm
  getGrid() {
    return cy.get('.products-grid');
  }

  // Card từng sản phẩm
  getCards() {
    return cy.get('.product-card');
  }

  // Nút Add to Cart trong card
  clickAddToCart(index = 0) {
    cy.get('.product-card button').eq(index).click();
  }

  // Form tạo/chỉnh sửa sản phẩm
  getForm() {
    return cy.get('[data-testid="product-form"]');
  }

  fillProductForm(product) {
    cy.get('input[aria-label="Ten san pham"]').clear().type(product.name);
    cy.get('input[aria-label="Gia"]').clear().type(product.price);
    cy.get('input[aria-label="So luong"]').clear().type(product.quantity);
  }

  submitForm() {
    cy.get('[data-testid="product-form"]').submit();
  }

  // Thông báo thành công (role="alert")
  getSuccessMessage() {
    return cy.get('[role="alert"]');
  }

  // Lấy sản phẩm trong danh sách theo tên (ProductList có data-testid="product-item")
  getProductInList(name) {
    return cy.contains('[data-testid="product-item"]', name);
  }

  // Loading và error trong ProductList
  getLoadingList() {
    return cy.get('[data-testid="loading-list"]');
  }

  getErrorList() {
    return cy.get('[data-testid="error-list"]');
  }

  // Chi tiết sản phẩm
  getProductDetail() {
    return cy.get('[data-testid="product-detail"]');
  }

  getProductName() {
    return cy.get('[data-testid="product-name"]');
  }

  getProductPrice() {
    return cy.get('[data-testid="product-price"]');
  }
}

export default ProductPage;
