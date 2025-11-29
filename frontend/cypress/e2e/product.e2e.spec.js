import ProductPage from '../pages/ProductPage';

describe('Product E2E Tests', () => {
  let productPage;

  beforeEach(() => {
    cy.login('testuser', 'Test123'); // giả lập đăng nhập

    // Mock API trả về dữ liệu từ fixture
    cy.intercept('GET', '/api/products', { fixture: 'products.json' }).as('getProducts');

    productPage = new ProductPage();
    productPage.visit();
    cy.wait('@getProducts'); // chờ dữ liệu load xong
  });

  it('Hiển thị grid sản phẩm', () => {
    productPage.getGrid().should('exist');
    productPage.getCards().should('have.length.at.least', 1);
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
    // giả lập API chi tiết sản phẩm
    cy.intercept('GET', '/api/products/1', { fixture: 'productDetail.json' }).as('getProductDetail');
    cy.visit('/products/1');
    cy.wait('@getProductDetail');

    productPage.getProductDetail().should('exist');
    productPage.getProductName().should('contain', 'Laptop Dell');
    productPage.getProductPrice().should('contain', 'VNĐ');
  });

  it('Có thể click Add to Cart trên card đầu tiên', () => {
    productPage.getCards().should('exist');
    productPage.clickAddToCart(0);
    // TODO: kiểm tra giỏ hàng nếu có
  });
});
