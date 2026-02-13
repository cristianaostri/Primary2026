import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

// El nombre debe ser único para API
Given('que me autentico por API con el usuario {string} y password {string}', (user, pass) => {
  cy.loginViaApi(user, pass);
});