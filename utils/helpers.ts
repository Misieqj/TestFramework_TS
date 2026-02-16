import { Page } from '@playwright/test';

export class Helpers {
  /**
   * Highlights an element on the page by adding a red border and optionally takes a screenshot.
   * @param page The Playwright page instance.
   * @param locator The CSS selector of the element to highlight.
   * @param doScreenshot Whether to take a screenshot after highlighting the element. Defaults to false.
   */
  static async highlightElement(page: Page, locator: string, doScreenshot: boolean = false) {
    await page.evaluate((loc) => {
      const element = document.querySelector(loc);
      if (element instanceof HTMLElement) {
        element.style.border = '2px solid red';
      }
    }, locator);

    if (doScreenshot) {
      await page.screenshot({ path: `${Date.now()}-highlighted-element.png` });
    }
  }
}
