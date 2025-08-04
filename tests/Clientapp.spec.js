const {test, expect} = require('@playwright/test');

test('First solo Playwright test',async function({browser})
{
const context = await browser.newContext();
const page = await context.newPage();
const userName = page.locator('#userEmail'); // je kunt een locator ook in een variabele opslaan zoals hier gedaan is
const signIn = page.locator('#login');

await page.goto("http://www.rahulshettyacademy.com/client/#/auth/login");
await userName.fill("katoeler@hotmail.com"); 
await page.locator("#userPassword").fill("Testing123");
await signIn.click();
//await page.waitForLoadState('networkidle'); // indien de data terug komt vanuit een service call kan er op gewacht worden dat alle service calls uitgevoerd zijn
await page.locator(".card-body b").last().waitFor(); // dit is een andere optie (ipv regel hierboven) voor het wachten dat de pagina geladen is.
const titles = await page.locator(".card-body b").allTextContents();
console.log (titles);
}
);

// OPMERKINGEN
// Als je testen van 1 file wilt kunnen doe je dit door het pad + filename toe te voegen zoals: npx playwright test tests/Clientapp.spec.js --headed