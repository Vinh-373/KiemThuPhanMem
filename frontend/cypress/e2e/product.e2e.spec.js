import ProductPage from '../pages/ProductPage';

describe('Product E2E Tests', () => {
  let productPage;

  beforeEach(() => {
    cy.login('testuser', 'Test123'); // giả lập đăng nhập
    productPage = new ProductPage();
    productPage.visit();
  });

  it('Hiển thị grid sản phẩm hoặc thông báo rỗng', () => {
    // Nếu có grid thì tồn tại .products-grid
    productPage.getGrid().should('exist');
    // Nếu không có sản phẩm thì có thông báo
    productPage.getNoProductsMessage().should('exist');
  });

  it('Có thể điền và submit form sản phẩm', () => {
    productPage.getForm().should('exist');
    productPage.fillProductForm({
      name: 'Laptop Dell',
      price: '15000000',
      quantity: '10'
    });
    productPage.submitForm();
    productPage.getSuccessMessage().should('exist');
  });

  it('Hiển thị sản phẩm trong danh sách', () => {
    productPage.getProductListContainer().should('exist');
    productPage.getProductItems().should('exist');
    productPage.getProductInList('Laptop Dell').should('exist');
  });

  it('Hiển thị chi tiết sản phẩm', () => {
    productPage.getProductDetail().should('exist');
    productPage.getProductName().should('exist');
    productPage.getProductPrice().should('contain', 'VNĐ');
  });

  it('Có thể click Add to Cart trên card đầu tiên', () => {
    productPage.getCards().should('exist');
    productPage.clickAddToCart(0);
    // ở đây bạn có thể kiểm tra trạng thái giỏ hàng nếu có
  });

  it('Hiển thị trạng thái loading và error khi tải danh sách', () => {
    productPage.getLoadingList().should('exist');
    productPage.getErrorList().should('exist');
  });

  it('Hiển thị trạng thái loading và error khi tải chi tiết', () => {
    productPage.getLoadingDetail().should('exist');
    productPage.getErrorDetail().should('exist');
  });
});
