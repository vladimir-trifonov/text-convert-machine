import { browser, element, by } from 'protractor';

export class FrontPage {
  navigateTo() {
    return browser.get('/');
  }
}
