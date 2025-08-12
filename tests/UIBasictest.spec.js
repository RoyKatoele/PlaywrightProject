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


test('UI Controls',async ({page})=> // dit dit hetzelfde als "First Playwright test"
{
await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); 
const userName = page.locator('#username'); 
const signIn = page.locator('#signInBtn');
const dropdown = page.locator('select.form-control');
await userName.fill("rahulshetty"); 
await page.locator("[type='password']").fill("learning");
await dropdown.selectOption("consult");
await page.locator(".radiotextsty").last().click();
await page.locator("#okayBtn").click();
await expect(page.locator(".radiotextsty").last()).toBeChecked(); // assertion om te checken of een radio button geset is
console.log (await page.locator(".radiotextsty").last().isChecked());  // dit geeft true of false terug of de radio button checked is
await page.locator("#terms").click();
await expect(page.locator("#terms")).toBeChecked();
await page.locator("#terms").uncheck();
expect(await page.locator("#terms").isChecked()).toBeFalsy; // toBeFalsy geeft aan dat hij verwacht dat deze assertion false is + "await" staat hier binnen de expect omdat de actie ("isChecked") ook binnen de expect staat. 
//await page.pause(); // handig om het scherm te bekijken en voor debuggen

// check of er een blinkende link rechtsboven in het scherm staat
const documentLink = page.locator("[href*='documents-request']");
await expect (documentLink).toHaveAttribute("class", "blinkingText");

}
);

test('Child windows handling', async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']"); 
    
    const [newPage] = await Promise.all( // en promise is voor als 2 elementen van elkaar afhankelijk zijn. hij voert deze 2 stappen paralel uit en wacht tot beide succesvol zijn
        [
        context.waitForEvent('page'), // listen for any new page | 3 promisses namelijk: pending, rejected, fulfilled
        documentLink.click(),// new page is opening
        ] 
    ) 

    // we willen nu uit de text van 'text' het email adres halen en deze vullen op de eerste pagina bij de username
    const text = await newPage.locator(".im-para.red").textContent(); // newPage zorgt ervoor dat hij zoekt op het nieuwe tabblad
    const arrayText = text.split("@"); //hiermee kan je een deel van een opgehaalde text splitten
    const domain = arrayText[1].split(" ")[0]
    console.log(domain);

    await page.locator("#username").fill(domain);
    await page.pause(); //handig voor debugging
   
})

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
// "await" voor een regel is alleen nodig als je in je stap een actie uitvoerd.
// als je een test in debug modes wil starten doe je dit door achter het command voor het runnen van de test "--debug" te zetten
// als je record en playback wilt uitvoeren kun dit doen met de command "npx playwright codegen  [URL bv.http://www.google.com]"
// traces zijn heel handig om meer informatie te krijgen over een gefaalde test. je kunt de file downloaden (vanuit het rapport of te vinden in de map test-results) en dan kun je hem inladen in trace.playwright.dev



// voor het bepalen van de locator van een element:
//if Id is present
//CSS -> tagname#id (or) #id
//
//If class attribute is present
// css -> tagname.class (or) .class
//
//Write css based on any Attribute
//css -> [attribute='value']
//
//Write css with traversing form parent to child
//css -> parenttagname >> childtagname
//
//If needs to write the locator based on text
//text=''