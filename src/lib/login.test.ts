import { test } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const wikipediaUsername = process.env.WIKIPEDIA_USERNAME;
const wikipediaPassword = process.env.WIKIPEDIA_PASSWORD;

const authFile = 'src/auth/login.json';

/**
 * Manually create a Wikipedia account and then finish this test
 * so that it signs into Wikipedia and captures the logged-in
 * session to src/auth/login.json, so that the tests in all.test.ts
 * run as a signed in user.
 */
test('Sign in to Wikipedia', async ({ page }) => {
    if (!wikipediaUsername || !wikipediaPassword) {
        throw new Error(`Need a username and password to sign in!`);
    }
    // Navigate to Wikipedia's login page
    await page.goto('https://en.wikipedia.org/w/index.php?title=Special:UserLogin&returnto=Main+Page');
    // fill in the login form
    await page.getByPlaceholder('Enter your username').fill(wikipediaUsername);
    await page.getByPlaceholder('Enter your password').fill(wikipediaPassword);
    await page.getByRole('button', { name: 'Log in' }).click();
    // Wait for the login to complete
    await page.waitForURL('https://en.wikipedia.org/wiki/Main_Page');
    await page.waitForTimeout(5000); // Wait for 5 seconds to ensure the login is complete
    // Save the storage state to a file
    await page.context().storageState({ path: authFile });
});
