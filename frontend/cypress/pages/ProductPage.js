// cypress/pages/ProductPage.js

class ProductPage {
  visit() {
    cy.visit('/products');
  }

  getUsername() {
    return cy.get('.user-info');
  }

  clickLogout() {
    cy.get('.logout-btn').click();
  }

  getProductItems() {
    return cy.get('.product-card');
  }

  getProductByName(name) {
    return cy.contains('.product-card', name);
  }

  clickAddToCart(name) {
    this.getProductByName(name)
      .find('button')
      .contains('Add to Cart')
      .click();
  }

  verifyProductInCart(name) {
    this.getCartItems().contains(name).should('exist');
  }
}

export default ProductPage;
