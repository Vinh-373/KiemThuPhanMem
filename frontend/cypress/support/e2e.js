// cypress/support/e2e.js

import './commands';

Cypress.on('uncaught:exception', () => false);