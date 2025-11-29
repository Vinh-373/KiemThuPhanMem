class ProductPage {
  visit() {
    cy.visit('/products');
  }

  getGrid() {
    return cy.get('.products-grid');
  }

  getCards() {
    return cy.get('.product-card');
  }

  getAddToCartButtons() {
    return cy.get('.product-card button');
  }

  getHeaderUsername() {
    return cy.get('.header-username');
  }

  clickLogout() {
    cy.get('.logout-button').click();
  }

  getLoadingSpinner() {
    return cy.get('.loading-spinner');
  }
}

export default ProductPage;
