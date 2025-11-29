class ProductPage {
  visit() {
    cy.visit('/products');
  }

  // Grid danh sách sản phẩm (ProductGrid.jsx có class="products-grid")
  getGrid() {
    return cy.get('.products-grid');
  }

  // Card từng sản phẩm (ProductCard.jsx có class="product-card")
  getCards() {
    return cy.get('.product-card');
  }

  // Nút Add to Cart trong card (ProductCard.jsx có <button>)
  clickAddToCart(index = 0) {
    cy.get('.product-card button').eq(index).click();
  }

  // Form tạo/chỉnh sửa sản phẩm (ProductForm.jsx có data-testid="product-form")
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

  // Thông báo thành công (ProductForm.jsx có <p role="alert">)
  getSuccessMessage() {
    return cy.get('[role="alert"]');
  }

  // Lấy sản phẩm trong danh sách theo tên (ProductList.jsx có data-testid="product-item")
  getProductInList(name) {
    return cy.contains('[data-testid="product-item"]', name);
  }

  // Loading và error trong ProductList.jsx
  getLoadingList() {
    return cy.get('[data-testid="loading-list"]');
  }

  getErrorList() {
    return cy.get('[data-testid="error-list"]');
  }

  // Chi tiết sản phẩm (ProductDetail.jsx có data-testid="product-detail")
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
