class ProductPage {
  visit() {
    cy.visit('/products');
  }

  clickAddNew() {
    cy.get('[data-testid="add-product-btn"]').click();
  }

  fillProductForm(product) {
    cy.get('[data-testid="product-name"]').clear().type(product.name);
    cy.get('[data-testid="product-price"]').clear().type(product.price);
    cy.get('[data-testid="product-quantity"]').clear().type(product.quantity);
  }

  submitForm() {
    cy.get('[data-testid="submit-btn"]').click();
  }

  getSuccessMessage() {
    return cy.get('[data-testid="success-message"]');
  }

  getProductInList(name) {
    return cy.contains('[data-testid="product-item"]', name);
  }

  clickEditProduct(name) {
    cy.contains('[data-testid="product-item"]', name)
      .parent()
      .find('[data-testid="edit-btn"]')
      .click();
  }

  clickDeleteProduct(name) {
    cy.contains('[data-testid="product-item"]', name)
      .parent()
      .find('[data-testid="delete-btn"]')
      .click();
  }

  confirmDelete() {
    cy.get('[data-testid="confirm-delete-btn"]').click();
  }

  searchProduct(keyword) {
    cy.get('[data-testid="search-input"]').clear().type(keyword);
    cy.get('[data-testid="search-btn"]').click();
  }

  getFilteredProduct(name) {
    return cy.contains('[data-testid="product-item"]', name);
  }
}

export default ProductPage;
