const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/features/**/*.feature",
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      on("file:preprocessor", createBundler({
        plugins: [createEsbuildPlugin(config)],
      }));

      // 1. Determinar el ambiente
      const version = config.env.CYPRESS_ENV || 'qa';
      
      // 2. Cargar el archivo correspondiente
      const envConfigs = require(`./cypress/support/environments/${version}.js`);

      // 3. INYECTAR EN CONFIG (Clave para que no salga null/undefined)
      config.baseUrl = envConfigs.baseUrl; // Setea la URL base del sistema
      config.env = {
        ...config.env,
        ...envConfigs // Setea todas las demás (authApiUrl, etc.)
      };

      return config; // IMPORTANTE: Devolver la configuración modificada
    },
  },
});