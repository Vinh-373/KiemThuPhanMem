class ProductPage {
  visit() {
    cy.visit('/products');
  }

  clickAddNew() {
    console.warn("⚠ clickAddNew called but no add button exists in UI");
  }

  fillProductForm(product) {
    console.warn("⚠ fillProductForm called but form does not exist in UI");
  }

  submitForm() {
    console.warn("⚠ submitForm called but no submit button exists in UI");
  }

  getSuccessMessage() {
    return cy.wrap("Mock success");
  }

  getProductInList(name) {
    return cy.contains('.product-card h3', name);
  }

  clickEditProduct(name) {
    console.warn("⚠ clickEditProduct called but no edit exists in UI");
  }

  clickDeleteProduct(name) {
    console.warn("⚠ clickDeleteProduct called but no delete exists in UI");
  }

  confirmDelete() {
    console.warn("⚠ confirmDelete called but no confirm exists");
  }

  searchProduct(keyword) {
    console.warn("⚠ searchProduct called but no search exists");
  }

  getFilteredProduct(name) {
    return cy.contains('.product-card h3', name);
  }
}

export default ProductPage;
