import { Page, expect } from '@playwright/test';

/**
 * This test was generated using Ranger's test recording tool. The test is supposed to:
 * 1. Navigate to Wikipedia's homepage
 * 2. Assert there are less than 7,000,000 articles in English
 * 3. Assert the page's text gets smaller when the 'Small' text size option is selected
 * 4. Assert the page's text gets larger when the 'Large' text size option is selected
 * 5. Assert the page's text goes back to the default size when the 'Standard' text size option is selected
 *
 * Instructions: Run the test and ensure it performs all steps described above
 *
 * Good luck!
 */


export async function run(page: Page, params: {}) {
     
    /** STEP 1: Navigate to URL */
    await page.goto('https://en.wikipedia.org/wiki/Main_Page');

    /** STEP 2: Click the link to view the total number of articles in English */
    const totalArticlesLink = page.locator('#articlecount li >> text=articles in');
    console.log(await totalArticlesLink.innerText());
    const totalArticlesText = await totalArticlesLink.innerText();
    const totalArticlesCount = parseInt(totalArticlesText.replace(/[^0-9]/g, ''), 10);
    expect(totalArticlesCount).toBeLessThan(7000000);
   
    /** STEP 3: Click the 'Mobile options' link in the appearance settings */
    await page.goto('https://en.m.wikipedia.org/w/index.php?title=Special:MobileOptions&returnto=Main+Page')
    await page.waitForTimeout(2000);
    
    /** STEP 4: Select the 'Small' text size option in the appearance settings */
    const smallTextSizeOption = page.getByRole('radio', { name: 'Medium' });
    await smallTextSizeOption.click();
    await page.waitForTimeout(5000);
    await page.locator('[class="branding-box"]').click();
    await page.waitForLoadState('networkidle');
    const paragraphMedium = await page.locator('#mp-tfa p');
    const fontSizeMedium = await paragraphMedium.evaluate(el => window.getComputedStyle(el).fontSize);
    console.log(fontSizeMedium); 
    expect(fontSizeMedium).toBe('18px'); 


    /** STEP 5: Click the 'Large' text size option to change the display size */
    await page.goto('https://en.m.wikipedia.org/w/index.php?title=Special:MobileOptions&returnto=Main+Page')
    await page.waitForTimeout(2000);
    const largeTextSizeOption = page.getByRole('radio', { name: 'Large' });
    await largeTextSizeOption.click();
    await page.waitForTimeout(5000);
    await page.locator('[class="branding-box"]').click();
    await page.waitForLoadState('networkidle');
    const paragraphLarge = await page.locator('#mp-tfa p');
    const fontSizeLarge = await paragraphLarge.evaluate(el => window.getComputedStyle(el).fontSize);
    console.log(fontSizeLarge);  
    expect(fontSizeLarge).toBe('20px'); 

   
    /** STEP 6: Click the 'Standard' text size option in the appearance settings */
    await page.goto('https://en.m.wikipedia.org/w/index.php?title=Special:MobileOptions&returnto=Main+Page')
    await page.waitForTimeout(2000);
    const standardTextSizeButton = page.getByLabel('Standard').first();
    await standardTextSizeButton.click();
    await page.waitForTimeout(5000);
    await page.locator('[class="branding-box"]').click();
    await page.waitForLoadState('networkidle');
    const paragraphfontSizeStandard = await page.locator('#mp-tfa p');
    const fontSizeStandard= await paragraphfontSizeStandard.evaluate(el => window.getComputedStyle(el).fontSize);
    console.log(fontSizeStandard);  
    expect(fontSizeStandard).toBe('16px'); 

}


