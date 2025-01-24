const { test, expect } = require('@playwright/test');

test('has link to login page', async ({ page }) => {
 
await page.goto("http://localhost:3000/");

		
		await page.click("text=Logowanie");

		// Verify the URL to ensure we are on the sign-in page
		await expect(page).toHaveURL("http://localhost:3000/user/signin");

		// Fill in the email input field
		await page.fill('input[name="name"]', "test1234@projekt.com");

		// Fill in the password input field
		await page.fill('input[name="password"]', "test1234");

		// Click the "Sign in" button
		await page.click('button[type="submit"]');

		// Verify successful redirection after signing in
		// Assuming a successful login redirects to '/' or another route
		// Replace with the actual route for post-login redirection in your app
		await expect(page).toHaveURL("http://localhost:3000/");
        await page.click("text=Profil");
        await expect(page).toHaveURL("http://localhost:3000/user/profile");
});
test('should redirect users to login page', async ({ page }) => {
 
    await page.goto("http://localhost:3000/user/profile");
    await expect(page).toHaveURL("http://localhost:3000/");
    
    });