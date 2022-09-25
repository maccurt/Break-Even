const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200/',
    viewportWidth: 1440,
    viewportHeight: 1000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
