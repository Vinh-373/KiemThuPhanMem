class ProductPage {
  visit() {
    cy.visit('/products');
  }

  // Lấy tất cả card sản phẩm
  getCards() {
    return cy.get('.product-card');
  }

  // Lấy ảnh sản phẩm trong card
  getProductImage(index = 0) {
    return cy.get('.product-card').eq(index).find('.product-img');
  }

  // Lấy tên sản phẩm
  getProductTitle(index = 0) {
    return cy.get('.product-card').eq(index).find('h3');
  }

  // Lấy công ty
  getProductCompany(index = 0) {
    return cy.get('.product-card').eq(index).find('.company');
  }

  // Lấy mô tả
  getProductDescription(index = 0) {
    return cy.get('.product-card').eq(index).find('.description');
  }

  // Lấy số lượng tồn kho
  getProductQuantity(index = 0) {
    return cy.get('.product-card').eq(index).find('.quantity');
  }

  // Lấy giá sản phẩm
  getProductPrice(index = 0) {
    return cy.get('.product-card').eq(index).find('.price');
  }

  // Click nút Add to Cart
  clickAddToCart(index = 0) {
    cy.get('.product-card').eq(index).find('.btn-add-cart').click();
  }

  // Trạng thái loading chi tiết
  getLoadingDetail() {
    return cy.get('[data-testid="loading-detail"]');
  }

  // Trạng thái error chi tiết
  getErrorDetail() {
    return cy.get('[data-testid="error-detail"]');
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

  // Lấy form sản phẩm
  getForm() {
    return cy.get('[data-testid="product-form"]');
  }

  // Điền dữ liệu vào form: tên, giá, số lượng
  fillProductForm(product) {
    cy.get('#name').clear().type(product.name);
    cy.get('#price').clear().type(product.price);
    cy.get('#quantity').clear().type(product.quantity);
  }

  // Submit form
  submitForm() {
    this.getForm().submit();
  }

  // Lấy thông báo thành công / lỗi
  getSuccessMessage() {
    return cy.get('[role="alert"]');
  }

  // Lấy thông báo loading khi edit
  getLoadingMessage() {
    return cy.contains('Đang tải dữ liệu...');
  }

  // Grid chứa danh sách sản phẩm
  getGrid() {
    return cy.get('.products-grid');
  }

  // Thông báo khi không có sản phẩm
  getNoProductsMessage() {
    return cy.get('.no-products');
  }

  // Loading danh sách
  getLoadingList() {
    return cy.get('[data-testid="loading-list"]');
  }

  // Error danh sách
  getErrorList() {
    return cy.get('[data-testid="error-list"]');
  }

  // Container danh sách sản phẩm
  getProductListContainer() {
    return cy.get('[data-testid="product-list-container"]');
  }

  // Lấy tất cả item sản phẩm
  getProductItems() {
    return cy.get('[data-testid="product-item"]');
  }

  // Lấy sản phẩm theo tên
  getProductInList(name) {
    return cy.contains('[data-testid="product-item"]', name);
  }

  // Click nút Edit sản phẩm trong card
  clickEditProduct(index = 0) {
    cy.get('.product-card').eq(index).find('.btn-edit').click();
  }

  // Click nút Delete sản phẩm trong card
  clickDeleteProduct(index = 0) {
    cy.get('.product-card').eq(index).find('.btn-delete').click();
  }

  // Xác nhận xóa (popup confirm)
  confirmDelete() {
    cy.contains('button', 'Delete').click();
  }

  // Điền dữ liệu cập nhật sản phẩm
  updateProductForm(product) {
    cy.get('#name').clear().type(product.name);
    cy.get('#price').clear().type(product.price);
    cy.get('#quantity').clear().type(product.quantity);
  }

  // Submit form cập nhật
  submitUpdate() {
    cy.get('.product-form').submit();
  }

  // Thông báo sau khi xóa
  getDeleteSuccessMessage() {
    return cy.get('[role="alert"]').contains('Xóa sản phẩm thành công');
  }

  // Thông báo sau khi cập nhật
  getUpdateSuccessMessage() {
    return cy.get('[role="alert"]').contains('Cập nhật sản phẩm thành công');
  }
}

export default ProductPage;
