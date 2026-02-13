import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../support/page-objects/front/LoginPage"; // Ajusta la ruta

// El texto ahora es: "en la interfaz"
Given('que inicio sesión en la interfaz con el usuario {string} y password {string}', (user, pass) => {
  // Usamos el método que creaste en tu LoginPage.js
  LoginPage.visit();
  LoginPage.login(user, pass);
});

Then('debería ver el dashboard principal', () => {
  cy.url().should('include', '/dashboard');
});