@api @auth
Feature: Autenticación por API
  Como QA, quiero asegurar que el login por API es funcional
  para utilizar la sesión en otros módulos.

  @smoke
  Scenario: Login exitoso por API
    # Este es el paso clave que usarás en todas tus pruebas
    Given que me autentico por API con el usuario "cris" y password "cris"
    