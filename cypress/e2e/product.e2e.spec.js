import ProductPage from '../pages/ProductPage';

describe('Product E2E Tests', () => {
  const productPage = new ProductPage();
  const product = {
    name: 'Laptop Dell',
    price: '15000000',
    quantity: '10'
  };

  beforeEach(() => {
    cy.login('testuser', 'Test123'); // Custom command
    productPage.visit();
  });

  // a) Test Create product flow (0.5 điểm)
  it('Nên tạo sản phẩm mới thành công', () => {
    productPage.clickAddNew();
    productPage.fillProductForm(product);
    productPage.submitForm();

    productPage.getSuccessMessage().should('contain', 'thành công');
    productPage.getProductInList(product.name).should('exist');
  });

  // b) Test Read/List products (0.5 điểm)
  it('Nên hiển thị danh sách sản phẩm', () => {
    cy.get('[data-testid="product-item"]').should('have.length.greaterThan', 0);
    productPage.getProductInList(product.name).should('exist');
  });

  // c) Test Update product (0.5 điểm)
  it('Nên cập nhật sản phẩm thành công', () => {
    productPage.getProductInList(product.name).click();
    cy.get('[data-testid="edit-btn"]').click();
    cy.get('[data-testid="product-price"]').clear().type('14000000');
    productPage.submitForm();

    productPage.getProductInList(product.name).should('contain', '14,000,000');
  });

  // d) Test Delete product (0.5 điểm)
  it('Nên xóa sản phẩm thành công', () => {
    productPage.getProductInList(product.name).click();
    cy.get('[data-testid="delete-btn"]').click();
    cy.get('[data-testid="confirm-delete"]').click();

    productPage.getProductInList(product.name).should('not.exist');
  });

  // e) Test Search/Filter functionality (0.5 điểm)
  it('Nên tìm kiếm sản phẩm theo tên', () => {
    cy.get('[data-testid="search-input"]').type('Laptop');
    cy.get('[data-testid="search-btn"]').click();

    productPage.getProductInList('Laptop Dell').should('exist');
  });
});