import { Page } from '@playwright/test';

// This is just an example of how we can define page ids and base page class for our tests
// For smaller projects we can define in Page class
// For bigger projects we should create in separate files and locate them in constants folder e.g. constants
export const PageId = {
  Home: 'Home',
  Login: 'Login',
  Settings: 'Settings',
  Profile: 'Profile',
  Dashboard: 'Dashboard',
};

// In easy way transform above object to array of page ids
export const PageIdsArray = Object.values(PageId);

export abstract class BasePage {
  constructor(protected page: Page) {
    this.page = page;
  }
}

export class HomePage extends BasePage {
  // add construnctor only if I need to initialize something
  constructor(page: Page) {
    super(page);
    // add extra initialization if needed
  }
}
