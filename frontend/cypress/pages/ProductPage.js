class ProductPage {
  visit() {
    cy.visit('/products');
  }

  getProductCard(name) {
    return cy.contains('.product-card h3', name);
  }

  getProductInList(name) {
    return cy.contains('.product-card h3', name);
  }

  clickAddToCart(name) {
    cy.contains('.product-card h3', name)
      .parent()
      .find('button')
      .click();
  }

  getProductPrice(name) {
    return cy.contains('.product-card h3', name)
      .parent()
      .find('.price');
  }

  openProductDetail(name) {
    cy.contains('.product-card h3', name).click();
  }

  getDetailName() {
    return cy.get('[data-testid="product-name"]');
  }

  getDetailPrice() {
    return cy.get('[data-testid="product-price"]');
  }
}

export default ProductPage;
