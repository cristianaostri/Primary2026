// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('loginViaApi', () => {
  const username = Cypress.env('apiUser');
  const password = Cypress.env('apiPassword');
  const application = Cypress.env('apiApplication');
  const authApiBaseUrl = Cypress.env('authApiUrl');

  // Usamos cy.session para cachear el login
  cy.session([username, application], () => {
    cy.log('*** Generando nueva sesión de API ***');
    
    cy.request({
      method: 'POST',
      url: `${authApiBaseUrl}/Users/token`,
      form: true,
      body: { username, password, application }
    }).then(response => {
      expect(response.status).to.eq(200);
      const token = response.body.access_token;

      // 1. Lo guardamos en localStorage (Persistencia de Navegador)
      window.localStorage.setItem('token', token);
      
      // 2. Lo guardamos en Cypress.env (Persistencia de Memoria)
      Cypress.env('accessToken', token);
    });
  }, {
    // Validamos que el token no sea nulo para considerar la sesión válida
    validate() {
      const token = window.localStorage.getItem('token');
      return token !== null && token.length > 0;
    }
  });

  // Sincronización: cy.session restaura el localStorage, 
  // pero debemos asegurar que Cypress.env esté actualizado para los comandos de API
  cy.then(() => {
    const cachedToken = window.localStorage.getItem('token');
    Cypress.env('accessToken', cachedToken);
  });
});