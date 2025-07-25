// @ts-check
const { devices} = require('@playwright/test');

const config = {
    testDir: './tests/',
    timeout: 30 * 1000, // timeout van de totale test is nu 30 seconden
    expect:  {
  
      timeout: 5000 // timeout van een specifieke assertion is 5 seconden
    },  
    
    reporter: 'html',

    use: {

        browserName : 'chromium',
        headless : false
    },

};

module.exports = config;

//OPMERKINGEN
//