import { NgSelectDocsPage } from './app.po';

describe('ng-select-docs App', function() {
  let page: Angular2SelectDocsPage;

  beforeEach(() => {
    page = new NgSelectDocsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
