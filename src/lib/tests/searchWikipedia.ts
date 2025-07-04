import { Page, expect } from '@playwright/test';

/**
 * This test was generated using Ranger's test recording tool. The test is supposed to:
 * 1. Navigate to Wikipedia
 * 2. Go to the "Artificial intelligence" page
 * 3. Click "View history"
 * 4. Assert that the latest edit was made by the user "Worstbull"
 *
 * Instructions:
 * - Run the test and ensure it performs all steps described above
 * - Add assertions to the test to ensure it validates the expected
 *   behavior:
 *   - If the latest edit was not made by "Worstbull" update the steps above accordingly
 *   - Write your assertion to provide clear diagnostic feedback if it fails
 *
 * Good luck!
 */
export async function run(page: Page, params: {}) {
    /** STEP 1: Navigate to URL */
    await page.goto('https://www.wikipedia.org/');

    /** STEP 2: Enter text 'art' into the search input field */
    const searchInputField = page.getByRole('searchbox', {
        name: 'Search Wikipedia',
    });
    await searchInputField.fill('artificial');

    /** STEP 3: Click the 'Artificial Intelligence' link in the search suggestions */
    const artificialIntelligenceLink = page.getByRole('link', {
        name: 'Artificial intelligence Intelligence of machines',
    });
    await artificialIntelligenceLink.click();

    /** STEP 4: Assert that the page title is 'Artificial intelligence' */
    await expect(page.locator('#firstHeading')).toHaveText('Artificial intelligence');
    console.log('Page title verified: Artificial intelligence');
  
    /** STEP 5: Click the 'View history' link */
    await page.waitForLoadState('networkidle');
    const viewHistoryLink = page.getByRole('link', { name: 'View history' });
    await viewHistoryLink.click();
    await page.waitForTimeout(5000);

   /** STEP 6: Wait for the history list to load */
    await page.waitForSelector('ul.mw-contributions-list');

    /** STEP 7: Get the username of the latest editor */
    const latestEditor = await page.locator('ul.mw-contributions-list .history-user >> nth=0').textContent();
    /** trim ' talk contribs' from the username  */
    const trimmedUsername = latestEditor.replace(' talk contribs', '');
    
    /** STEP 8: Assert that the latest editor is 'Maxeto0910' */
    expect(trimmedUsername?.trim()).toBe('Maxeto0910');

    console.log(`Latest editor: ${latestEditor}`);
}
