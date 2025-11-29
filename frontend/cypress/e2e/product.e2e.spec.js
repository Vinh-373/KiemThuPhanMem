import ProductPage from '../pages/ProductPage';

describe('Product E2E Tests', () => {
  const productPage = new ProductPage();

  beforeEach(() => {
    cy.login('testuser', 'Test123'); // Custom command giả lập đăng nhập
    productPage.visit();
  });

  it('Nên tạo sản phẩm mới thành công', () => {
    productPage.clickAddNew();
    productPage.fillProductForm({
      name: 'Laptop Dell',
      price: '15000000',
      quantity: '10'
    });
    productPage.submitForm();

    productPage.getSuccessMessage()
      .should('contain', 'thành công');
    productPage.getProductInList('Laptop Dell')
      .should('exist');
  });

  it('Nên cập nhật sản phẩm thành công', () => {
    productPage.clickEditProduct('Laptop Dell');
    cy.get('[data-testid="product-price"]').clear().type('14000000');
    productPage.submitForm();

    cy.get('[data-testid="product-price"]')
      .should('contain', '14,000,000');
  });

  it('Nên xóa sản phẩm thành công', () => {
    productPage.clickDeleteProduct('Laptop Dell');
    productPage.getProductInList('Laptop Dell')
      .should('not.exist');
  });
});
