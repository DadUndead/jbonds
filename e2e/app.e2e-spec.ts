import { JbondsPage } from './app.po';

describe('jbonds App', () => {
  let page: JbondsPage;

  beforeEach(() => {
    page = new JbondsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
