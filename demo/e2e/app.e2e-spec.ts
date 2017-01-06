import { Angular2SelectDocsPage } from './app.po';

describe('angular2-select-docs App', function() {
  let page: Angular2SelectDocsPage;

  beforeEach(() => {
    page = new Angular2SelectDocsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
