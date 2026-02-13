class LoginPage {
  // Centralizamos todos los selectores aquí
  elements = {
    userInput: () => cy.get('#user'),
    passInput: () => cy.get('#password'),
    loginBtn: () => cy.get('button').contains('Ingresar'),
    // Ejemplo de cómo agregarías más sin romper nada:
    rememberMe: () => cy.get('#remember'), 
  }

  visit() {
    // Si baseUrl no carga, cy.visit fallará con un error claro de URL
    cy.visit(Cypress.env('baseUrl'));
  }

  // Usamos 'this' para acceder a los elementos de arriba
  login(username, password) {
    // No hace falta clic previo, .type() lo hace por ti
    this.elements.userInput().should('be.visible').type(username);
    this.elements.passInput().should('be.visible').type(password);
    this.elements.loginBtn().click();
  }
}

export default new LoginPage();