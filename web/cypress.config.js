const { defineConfig } = require("cypress");
//const { readPdf } = require('./cypress/support/helper')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      //on('task', {
        //readPdf
      //})
    },
    experimentalStudio: true,
    video: true
  },
});
