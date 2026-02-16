import { Page } from '@playwright/test';

export class ApiMock {
  constructor(private page: Page) {}

  /**
   * Cleans up any existing routes to ensure a clean state for new tests.
   */
  async cleanup() {
    await this.page.unroute('**/*');
  }

  /**
   * Redirects requests matching the specified path part to a new base URL.
   * @param pathPart The part of the URL path to match.
   * @param newBaseUrl The new base URL to redirect to.
   * @param times The number of times to apply the redirection.
   */
  async redirectToUrl(pathPart: string, newBaseUrl: string, times: number = 1) {
    await this.page.route(
      `**/${pathPart}**`,
      (route) => {
        const url = route.request().url();
        const newUrl = url.replace(/https?:\/\/[^\/]+/, newBaseUrl);
        route.continue({ url: newUrl });
      },
      { times },
    );
  }

  /**
   * Mocks API responses for requests matching the specified path part.
   * @param pathPart The part of the URL path to match for mocking.
   * @param response The mock response to return. Example below as customResponse with itemsContent as an array of items.
   * @param times The number of times to apply the mock response.
   */
  async mockResponse(pathPart: string, response: any, times: number = 1) {
    await this.page.route(
      `**/${pathPart}**`,
      (route) => {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(response),
        });
      },
      { times },
    );
  }

  /**
   * Generates a custom response object with the specified items content.
   * @param itemsContent The array of items to include in the response.
   * @returns A custom response object containing the items and additional metadata.
   */
  customResponse<T>(itemsContent: Array<T>) {
    return {
      items: itemsContent,
      total: itemsContent.length,
      extraData: {
        info: 'This is some extra information that can be used for testing purposes.',
        timestamp: new Date().toISOString(),
      },
    };
  }

  /**
   * Mocks API responses for requests matching the specified path part.
   * @param pathPart The part of the URL path to match for mocking.
   */
  async stopMockingPath(pathPart: string) {
    await this.page.unroute(`**/${pathPart}**`);
  }
}
