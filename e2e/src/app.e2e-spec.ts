import { AppPage } from './app.po';
import { browser, logging, protractor } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

  it('should redirect to not-found page', () => {
    browser.get(`${browser.baseUrl}blabla`);
    browser.getCurrentUrl().then(function (url) {
      expect(url).toEqual('http://localhost:4200/not-found');
    });
  })

  it('button should be disabled', () => {
    page.navigateTo();
    expect(page.getElByID('button').getAttribute('disabled')).toBeTruthy();
  })

  it('should navigate to flights page', () => {
    navigateToFlightPage();
  })

  it('should check the numner of search results', () => {
    navigateToFlightPage();
    expect(page.getElByClass('.container').getAttribute('childElementCount')).toEqual('10');
  })

  it('should sort by connection & duration buttons', () => {
    navigateToFlightPage();
    expect(page.getElByID('0').getText()).toContain('830$');
    page.getElByID('btn-duration').click();
    expect(page.getElByID('0').getText()).toContain('550$');
    page.getElByID('btn-connection').click();
    expect(page.getElByID('0').getText()).toContain('611$');
  })

  it('should filter by price', () => {

    navigateToFlightPage();
    page.getElByClass('.container').getSize().then((sizeBefore) => {
      page.getElByClass('.price-slider').click();
      page.getElByClass('.container').getSize().then((sizeAfter) => {
        expect(sizeBefore.height).toBeGreaterThan(sizeAfter.height);
      });
    });
  })

  function navigateToFlightPage() {
    page.navigateTo();
    page.getElByID('from').sendKeys('Tel Aviv');
    page.getElByID('to').sendKeys('Madrid');
    page.getElByID('fromDate').sendKeys(protractor.Key.chord(protractor.Key.CONTROL, "a"));
    page.getElByID('fromDate').sendKeys(protractor.Key.BACK_SPACE);
    page.getElByID('fromDate').sendKeys('2020-11-01');
    page.getElByID('toDate').sendKeys(protractor.Key.chord(protractor.Key.CONTROL, "a"));
    page.getElByID('toDate').sendKeys(protractor.Key.BACK_SPACE);
    page.getElByID('toDate').sendKeys('2020-11-11');
    page.getElByID('stops').sendKeys(2);

    expect(page.getElByID('button').getAttribute('disabled')).toBeFalsy();
    page.getElByID('button').click();
    browser.getCurrentUrl().then(function (url) {
      expect(url).toEqual(`${browser.baseUrl}flights?from=tel%20aviv&to=madrid&fromDate=Sun%20Nov%2001%202020%2002:00:00%20GMT%2B0200%20(Israel%20Standard%20Time)&toDate=Wed%20Nov%2011%202020%2002:00:00%20GMT%2B0200%20(Israel%20Standard%20Time)&stops=2`);
    });
  }
});