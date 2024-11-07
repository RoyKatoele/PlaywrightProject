const {test, expect} = require('@playwright/test');


test('First Playwright test',async function({browser}) // andere manier van "function()" scrhijven is "()=>"
{
//playwright code-
//step 1 open browser
//step 2 enter user/pw
//step 3 Click (javascript is async. dus volgorde van schrijven is niet volgorde van oppakken)

//chrome - plugins/ cookies
const context = await browser.newContext();
const page = await context.newPage();
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log(await page.title());
page.locator()

}
);

test('page Playwright test',async ({page})=> // dit dit hetzelfde als "First Playwright test"
{
await page.goto("https://www.google.nl/");
//get title - assertion
console.log(await page.title());
await expect(page).toHaveTitle("Google"); 
}
);

// OPMERKINGEN
// runnen van een test: "npx playwright test" indien niet headless: "npx playwright test --headed"
// als je 1 test wil uitvoeren uit het bestand zet je .only achter de test: Bijv. "test.only('page Playwright test',async ({page})=>"
// hier vindt je een lijst met assertions: https://playwright.dev/docs/test-assertions

