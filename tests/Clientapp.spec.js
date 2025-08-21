const {test, expect} = require('@playwright/test');

test ('First solo Playwright test',async function({browser})
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
//ZARA COAT 3
const productName = 'ZARA COAT 3';
const products = page.locator(".card-body");
const count = await products.count();

for (let i = 0; i < count; ++i)
{
    if (await products.nth(i).locator("b").textContent() === productName)
    {
        //add to cart
        await products.nth(i).locator("text= Add To Cart").click(); //"text=Add To Cart" zo kan je op de text op een pagina zoeken
        break; // dit zorgt ervoor dat hij stopt als hij het juiste product heeft gevonden
    }
}
await page.locator("[routerlink*='cart']").click();
page.locator("div li").first().waitFor(); //deze wait for is handig als je even moet wachten tot een bepaald element geladen is. voor je een volgende check kan doen
const bool = page.locator("h3:has-text('ZARA COAT 3')").isVisible(); //vindt alleen elementen met de tagname h3 waarin de text staat 'ZARA COAT 3'
expect(bool).toBeTruthy();
await page.pause();
}
);

// OPMERKINGEN
// Als je testen van 1 file wilt kunnen doe je dit door het pad + filename toe te voegen zoals: npx playwright test tests/Clientapp.spec.js --headed