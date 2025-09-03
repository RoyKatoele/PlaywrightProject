const { test, expect } = require('@playwright/test');

test('Search for Datacombinatietest article', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('http://roykatoele.nl/');
    
    // Fill in the search box
    await page.getByRole('searchbox', { name: 'Search for:' }).fill('datacombinatietest');
    
    // Click the search button
    await page.getByRole('button', { name: 'Search' }).click();
    
    // Verify we get to the search results page
    await expect(page).toHaveURL(/.*\?s=datacombinatietest/);
    
    // Verify the search results title is present
    await expect(page.getByRole('heading', { name: /Search Results for: datacombinatietest/i })).toBeVisible();
    
    // Click on the first article about datacombinatietest
    await page.getByRole('link', { name: 'Testontwerptechniek : Datacombinatietest (DCT)' }).first().click();
    
    // Verify we get to the correct article page
    await expect(page).toHaveURL('http://roykatoele.nl/testontwerptechniek-datacombinatietest-dct/');
    
    // Verify the article title is present
    await expect(page.getByRole('heading', { name: 'Testontwerptechniek : Datacombinatietest (DCT)', level: 1 })).toBeVisible();
    
    // Verify some key content from the article is present
    await expect(page.getByText('De datacombinatietest (DCT) is een testontwerptechniek')).toBeVisible();
});
