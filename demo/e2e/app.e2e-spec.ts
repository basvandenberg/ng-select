import { Demo4Page } from './app.po';

describe('demo4 App', () => {
  let page: Demo4Page;

  beforeEach(() => {
    page = new Demo4Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
