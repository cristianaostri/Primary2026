const { defineConfig } = require("cypress")
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports/temp_jsons', 
    charts: true,
    reportPageTitle: 'OneClearing Automation Report',
    embeddedScreenshots: true,
    inlineAssets: true, 
    saveAllAttempts: false,
  },
  e2e: {
    specPattern: "cypress/e2e/features/**/*.feature",
    async setupNodeEvents(on, config) {
      // 1. Registro de plugins
      await addCucumberPreprocessorPlugin(on, config);
      require('cypress-mochawesome-reporter/plugin')(on); 

      on("file:preprocessor", createBundler({
        plugins: [createEsbuildPlugin(config)],
      }));

      // 2. Gestión de ambientes
      const version = config.env.CYPRESS_ENV || 'qa';
      const envConfigs = require(`./cypress/support/environments/${version}.js`);
      config.baseUrl = envConfigs.baseUrl;
      config.env = { ...config.env, ...envConfigs };

      return config; 
    },
  },
});