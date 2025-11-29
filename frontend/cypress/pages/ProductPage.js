import ProductPage from '../pages/ProductPage';

describe('Product E2E Tests', () => {
  const productPage = new ProductPage();

  beforeEach(() => {
    cy.login('testuser', 'Test123');
    productPage.visit();
  });

  it('Hiển thị grid sản phẩm', () => {
    productPage.getGrid().should('exist');
  });

  it('Hiển thị thông báo khi không có sản phẩm', () => {
    cy.contains('No products available').should('exist');
  });
});
