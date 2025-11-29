import ProductPage from '../pages/ProductPage';

describe('Product E2E Tests', () => {
  const productPage = new ProductPage();

  const product = {
    name: 'Laptop Dell',
    price: '15000000',
    quantity: '10'
  };

  beforeEach(() => {
    cy.login('testuser', 'Test123'); // Custom command đã định nghĩa
    productPage.visit();
  });

  // a) Test Create product flow (0.5 điểm)
  it('Nên tạo sản phẩm mới thành công', () => {
    productPage.clickAddNew();
    productPage.fillProductForm(product);
    productPage.submitForm();

    productPage.getSuccessMessage().should('contain', 'Thêm thành công');
    productPage.getProductInList(product.name).should('exist');
  });

  // b) Test Read/List products (0.5 điểm)
  it('Nên hiển thị sản phẩm trong danh sách', () => {
    productPage.getProductInList(product.name).should('exist');
  });

  // c) Test Update product (0.5 điểm)
  it('Nên cập nhật sản phẩm thành công', () => {
    productPage.clickEditProduct(product.name);
    cy.get('[data-testid="product-price"]').clear().type('14000000');
    productPage.submitForm();

    productPage.getProductInList(product.name)
      .parent()
      .should('contain', '14,000,000');
  });

  // d) Test Delete product (0.5 điểm)
  it('Nên xóa sản phẩm thành công', () => {
    productPage.clickDeleteProduct(product.name);
    productPage.confirmDelete();

    productPage.getProductInList(product.name).should('not.exist');
  });

  // e) Test Search/Filter functionality (0.5 điểm)
  it('Nên tìm kiếm sản phẩm thành công', () => {
    productPage.searchProduct('Laptop');
    productPage.getFilteredProduct(product.name).should('exist');
  });
});
