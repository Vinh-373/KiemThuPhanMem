import ProductPage from '../pages/ProductPage';

describe('Product E2E Tests', () => {
  let productPage;

  beforeEach(() => {
    cy.login('testuser', 'Test123');
    productPage = new ProductPage();
    productPage.visit();
  });

  it('Hiển thị thông báo khi không có sản phẩm', () => {
    cy.contains('No products available').should('exist');
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

  it('Hiển thị chi tiết sản phẩm', () => {
    productPage.getProductName().should('exist');
    productPage.getProductPrice().should('contain', 'VNĐ');
  });
});
