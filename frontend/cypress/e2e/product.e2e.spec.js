import ProductPage from '../pages/ProductPage';

describe('Product Management E2E', () => {
  const productPage = new ProductPage();
  const product = {
    name: 'Test Product',
    price: '123',
    quantity: '10'
  };

  beforeEach(() => {
    productPage.visit();
  });

  it('should create a new product', () => {
    productPage.clickAddNew();
    productPage.fillProductForm(product);
    productPage.submitForm();

    productPage.getSuccessMessage().should('be.visible').and('contain', 'Product created successfully');
    productPage.getProductInList(product.name).should('exist');
  });

  it('should edit a product', () => {
    productPage.clickEditProduct(product.name);

    const updated = { ...product, name: 'Edited Product' };
    productPage.fillProductForm(updated);
    productPage.submitForm();

    productPage.getSuccessMessage().should('be.visible').and('contain', 'Product updated successfully');
    productPage.getProductInList(updated.name).should('exist');
  });

  it('should filter/search for product', () => {
    productPage.searchProduct('Edited Product');
    productPage.getFilteredProduct('Edited Product').should('exist');
  });

  it('should delete a product', () => {
    productPage.clickDeleteProduct('Edited Product');
    productPage.confirmDelete();

    productPage.getSuccessMessage().should('be.visible').and('contain', 'Product deleted successfully');
    productPage.getProductInList('Edited Product').should('not.exist');
  });
});
