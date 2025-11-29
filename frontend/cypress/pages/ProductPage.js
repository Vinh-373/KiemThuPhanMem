class ProductPage {
  visit() {
    cy.visit('/products');
  }

  clickAddNew() {
    cy.get('[data-testid="add-product-btn"]').should('exist').click();
  }

  fillProductForm(product) {
    cy.get('[data-testid="product-name"]').should('exist').clear().type(product.name);
    cy.get('[data-testid="product-price"]').should('exist').clear().type(product.price);
    cy.get('[data-testid="product-quantity"]').should('exist').clear().type(product.quantity);
  }

  submitForm() {
    cy.get('[data-testid="submit-btn"]').should('exist').click();
  }

  getSuccessMessage() {
    return cy.get('[data-testid="success-message"]'); // PHẢI TRẢ VỀ DOM ELEMENT!!!
  }

  getProductInList(name) {
    return cy.contains('.product-card', name);
  }

  clickEditProduct(name) {
    cy.contains('.product-card', name)
      .find('[data-testid="edit-btn"]').click();
  }

  clickDeleteProduct(name) {
    cy.contains('.product-card', name)
      .find('[data-testid="delete-btn"]').click();
  }

  confirmDelete() {
    cy.get('[data-testid="confirm-delete-btn"]').should('exist').click();
  }

  searchProduct(keyword) {
    cy.get('[data-testid="search-input"]').should('exist').clear().type(keyword);
    cy.get('[data-testid="search-btn"]').should('exist').click();
  }

  getFilteredProduct(name) {
    return cy.contains('.product-card', name);
  }
}

export default ProductPage;
