Feature: Login de Usuario

  Scenario: Inicio de sesion exitoso
    Given que inicio sesión en la interfaz con el usuario "cris" y password "cris"
    Then debería ver el dashboard principal