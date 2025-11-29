import ProductPage from '../pages/ProductPage';

describe('Product E2E Tests', () => {
  const productPage = new ProductPage();

  beforeEach(() => {
    cy.login('testuser', 'Test123'); // Custom command giả lập đăng nhập
    productPage.visit();
  });

  it('Nên tạo sản phẩm mới thành công', () => {
    // Điền form tạo sản phẩm trực tiếp
    productPage.fillProductForm({
      name: 'Laptop Dell',
      price: '15000000',
      quantity: '10'
    });

    productPage.submitForm();

    // Kiểm tra thông báo thành công
    productPage.getSuccessMessage()
      .should('contain', 'Them san pham thanh cong');

    // Kiểm tra sản phẩm xuất hiện trong danh sách
    productPage.getProductInList('Laptop Dell')
      .should('exist');
  });

  it('Nên cập nhật sản phẩm thành công', () => {
    // Giả sử chọn sản phẩm và mở form chỉnh sửa
    productPage.getProductInList('Laptop Dell').click();

    // Sửa giá sản phẩm
    cy.get('input[aria-label="Gia"]').clear().type('14000000');

    productPage.submitForm();

    // Kiểm tra giá đã được cập nhật
    cy.get('input[aria-label="Gia"]').should('have.value', '14000000');
  });

  it('Nên xóa sản phẩm thành công', () => {
    // Giả sử chọn sản phẩm và click nút xóa
    productPage.getProductInList('Laptop Dell').click();

    // (Ở đây cần có nút xóa trong component, nếu chưa có thì test sẽ fail)
    cy.get('[data-testid="delete-btn"]').click();
    cy.get('[data-testid="confirm-delete"]').click();

    // Kiểm tra sản phẩm không còn trong danh sách
    productPage.getProductInList('Laptop Dell')
      .should('not.exist');
  });
});
