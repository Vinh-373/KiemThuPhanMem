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

  it('Có thể thêm sản phẩm mới qua form', () => {
    // mở form thêm sản phẩm
    productPage.clickAddProductButton();
    productPage.getForm().should('exist');

    productPage.fillProductForm({
      name: 'Laptop Dell',
      price: '15000000',
      quantity: '10'
    });

    productPage.submitForm();
    productPage.getSuccessMessage().should('contain', 'Thêm sản phẩm thành công');
  });

  it('Có thể cập nhật sản phẩm', () => {
    productPage.clickEditProduct(0); // mở form edit sản phẩm đầu tiên

    productPage.updateProductForm({
      name: 'Laptop Dell Updated',
      price: '16000000',
      quantity: '8'
    });

    productPage.submitUpdate();
    productPage.getUpdateSuccessMessage().should('contain', 'Cập nhật sản phẩm thành công');
  });

  it('Có thể xóa sản phẩm', () => {
    // Bắt confirm và tự động OK
    cy.on('window:confirm', () => true);

    // Bắt alert và kiểm tra nội dung
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Xóa sản phẩm thành công');
    });

    productPage.clickDeleteProduct(0);
    
  });
});
