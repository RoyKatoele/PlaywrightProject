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
const userName = page.locator('#username'); // je kunt een locator ook in een variabele opslaan zoals hier gedaan is
const signIn = page.locator('#signInBtn');
const cardTitles = page.locator(".card-body a"); 
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log(await page.title());
await userName.fill("rahulshetty"); // hier gaat hij op zoek naar het element met de ID (username) en vult deze met de waarde in fill
await page.locator("[type='password']").fill("learning"); // hier gaat hij op zoek naar het element "type='password'"en vult deze met de waarde in fill
await signIn.click(); // de knop met het ID "signInBtn" wordt geklikt
// deze wait hieronder zorgt ervoor dat er gewacht wordt met de inlog foutmelding checken tot deze ook echt in beeld is. 'textContent' geeft de waarde in het foutmeldingsveld weer  
console.log (await page.locator("[style*='block']").textContent()); // het * na de 'style' zorgt er voor dat je op een stukje van een waarde kan zoeken in dit geval wat de gehele value "display: block;"
await expect(page.locator("[style*='block']")).toContainText('Incorrect'); //deze stap haalt de waarde op in het element 'style*='block'' en controleert dat deze deels het woord 'incorrect' bevat
await userName.fill("");
await userName.fill("rahulshettyacademy");
await signIn.click();
console.log (await cardTitles.nth(0).textContent()); // deze locator vindt 4 elementen. om te zorgen dat hij de eerste terug geeft kun je ".nth(0)" toevoegen als 1 invult zal hij het tweede element ophalen
console.log (await cardTitles.first().textContent()); // dit is een andere optie
const allTitles = await cardTitles.allTextContents(); // haalt alle content op met deze locator, hier zit geen smart wait op, deze zit wel op "textContent()" (zie hier voor meer info: https://playwright.dev/docs/actionability)
console.log(allTitles);
}
);

test.only('First solo Playwright test',async function({browser})
{
const context = await browser.newContext();
const page = await context.newPage();
const userName = page.locator('#userEmail'); // je kunt een locator ook in een variabele opslaan zoals hier gedaan is
const signIn = page.locator('#login');
const cardTitles = page.locator(".card-body b");
await page.goto("http://www.rahulshettyacademy.com/client/#/auth/login");
await userName.fill("katoeler@hotmail.com"); 
await page.locator("#userPassword").fill("Testing123");
await signIn.click();
console.log (await cardTitles.first().textContent());
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
// runnen van een test: "npx playwright test" indien niet headless: "npx playwright test --headed" (terminal is te open in VS-code met Ctrl + ~)
// als je 1 test wil uitvoeren uit het bestand zet je .only achter de test: Bijv. "test.only('page Playwright test',async ({page})=>"
// hier vindt je een lijst met assertions: https://playwright.dev/docs/test-assertions