import { Page } from '@playwright/test';

export class LocalStorage {
  /**
   * Sets an item in the local storage of the given page.
   * @param page The Playwright page instance.
   * @param key The key of the item to set.
   * @param value The value of the item to set.
   */
  static async setItem(page: Page, key: string, value: string) {
    await page.evaluate(
      ([k, v]) => {
        localStorage.setItem(k, v);
      },
      [key, value],
    );
  }

  /**
   * Retrieves an item from the local storage of the given page.
   * @param page The Playwright page instance.
   * @param key The key of the item to retrieve.
   * @returns The value of the item associated with the given key, or null if the key does not exist.
   */
  static async getItem(page: Page, key: string): Promise<string | null> {
    return await page.evaluate((k) => localStorage.getItem(k), key);
  }
}
