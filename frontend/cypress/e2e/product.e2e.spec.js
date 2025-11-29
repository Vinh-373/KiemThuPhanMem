import ProductPage from '../pages/ProductPage';

describe('Product E2E Tests', () => {
  const productPage = new ProductPage();

  beforeEach(() => {
    cy.login('testuser', 'Test123'); // Custom command giả lập đăng nhập
    productPage.visit();
  });

  it('Có thể thêm sản phẩm vào giỏ hàng', () => {
    // Kiểm tra có card sản phẩm và click Add to Cart
    productPage.clickAddToCart(0);
    // Ở đây bạn có thể kiểm tra trạng thái giỏ hàng nếu có
  });

  it('Có thể điền và submit form sản phẩm', () => {
    productPage.getForm().should('exist');
    productPage.fillProductForm({
      name: 'Laptop Dell',
      price: '15000000',
      quantity: '10'
    });
    productPage.getForm().submit();

    productPage.getSuccessMessage().should('exist');
  });

  it('Hiển thị sản phẩm trong danh sách', () => {
    productPage.getProductInList('Laptop Dell').should('exist');
  });

  it('Hiển thị lỗi khi tải danh sách thất bại', () => {
    productPage.getErrorList().should('exist');
  });

  it('Hiển thị chi tiết sản phẩm', () => {
    productPage.getProductName().should('not.be.empty');
    productPage.getProductPrice().should('contain', 'VNĐ');
  });
});
