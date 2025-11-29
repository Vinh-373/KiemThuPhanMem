import ProductPage from '../pages/ProductPage';

describe('Product E2E Tests', () => {
  const productPage = new ProductPage();

  beforeEach(() => {
    cy.login('testuser', 'Test123'); // Custom command giả lập đăng nhập
    productPage.visit();
  });

  it('Hiển thị danh sách sản phẩm', () => {
    productPage.getGrid().should('exist');
    productPage.getCards().should('exist');
  });

  it('Có thể thêm sản phẩm vào giỏ hàng', () => {
    productPage.getCards().should('exist');
    productPage.clickAddToCart(0);
    // Ở đây bạn có thể kiểm tra console log hoặc trạng thái giỏ hàng nếu có
  });

  it('Hiển thị form sản phẩm', () => {
    productPage.getForm().should('exist');
    productPage.fillProductForm({
      name: 'Laptop Dell',
      price: '15000000',
      quantity: '10'
    });
    productPage.submitForm();
    productPage.getSuccessMessage().should('exist');
  });

  it('Hiển thị chi tiết sản phẩm', () => {
    productPage.getProductDetail().should('exist');
    productPage.getProductName().should('not.be.empty');
    productPage.getProductPrice().should('contain', 'VNĐ');
  });

  it('Hiển thị trạng thái loading và error trong danh sách', () => {
    productPage.getLoadingList().should('exist');
    productPage.getErrorList().should('exist');
  });
});
