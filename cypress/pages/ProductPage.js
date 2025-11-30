class ProductPage {
  visit() {
    cy.visit('/products'); // Truy cập trang sản phẩm
  }

  getUsername() {
    return cy.get('[data-testid="username-display"]'); // Hiển thị tên người dùng
  }

  clickLogout() {
    cy.get('[data-testid="logout-btn"]').click(); // Nhấn nút đăng xuất
  }

  getProductItems() {
    return cy.get('[data-testid="product-item"]'); // Lấy danh sách sản phẩm
  }

  clickAddToCartByIndex(index) {
    cy.get('[data-testid="add-to-cart-btn"]').eq(index).click(); // Thêm sản phẩm vào giỏ theo vị trí
  }

  getLoadingSpinner() {
    return cy.get('[data-testid="loading-spinner"]'); // Kiểm tra trạng thái loading
  }

  getHeaderTitle() {
    return cy.get('[data-testid="header-title"]'); // Kiểm tra tiêu đề trang
  }
}

export default ProductPage;