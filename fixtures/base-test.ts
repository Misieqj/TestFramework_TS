import { APIRequestContext, test as base, Page } from '@playwright/test';
import { testParams } from './test-params';

export const test = base.extend<{
  apiContext: APIRequestContext;
  page: Page;
}>({
  apiContext: async ({ playwright }, use) => {
    // Create a new API request context with the base URL and headers
    const apiContext = await playwright.request.newContext({
      baseURL: testParams.ApiBaseUrl,
      extraHTTPHeaders: {
        Accept: 'application/json',
        Authorization: `Bearer ${testParams.ApiToken}`,
      },
    });

    // Use the API context in tests
    await use(apiContext);

    // Clean up after tests
    await apiContext.dispose();
  },
  page: async ({ page }, use) => {
    // Perform login before using the page
    await page.goto(testParams.BaseUrl + 'login');
    await page.fill('#username', testParams.Username);
    await page.fill('#password', testParams.Password);
    await page.click('#login-button');

    // Wait for navigation after login
    await use(page);

    // Clean up after tests, e.g. log out
    await page.close();
  },
});
