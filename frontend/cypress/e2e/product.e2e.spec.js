// cypress/e2e/product.e2e.spec.js

import ProductPage from '../pages/ProductPage';

describe('Product E2E Tests', () => {
  const productPage = new ProductPage();

  beforeEach(() => {
    cy.login('anhthi', 'Test123'); // custom command đã định nghĩa
    productPage.visit();
  });

  it('Nên hiển thị danh sách sản phẩm', () => {
    productPage.getProductItems().should('have.length.at.least', 1);
    productPage.getProductByName('iPhone 15 Pro Max 256GB').should('exist');
  });

  it('Nên thêm sản phẩm vào giỏ hàng', () => {
    productPage.clickAddToCart('Samsung Galaxy S24 Ultra 256GB');
    productPage.verifyProductInCart('Samsung Galaxy S24 Ultra 256GB');
  });

  it('Nên hiển thị tên người dùng sau khi đăng nhập', () => {
    productPage.getUsername().should('contain', 'anhthi');
  });

  it('Nên đăng xuất và quay về trang đăng ký', () => {
    productPage.clickLogout();
    cy.url().should('include', '/register');
  });
});