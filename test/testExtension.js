const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { expect } = require('chai');

let chromeOptions = new chrome.Options();
chromeOptions.addArguments('--headless=new', `--load-extension=${__dirname}/../src/`);

let driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(chromeOptions)
    .build();

async function doesElementExist(selector, expected) {
    let elementExists = await driver.executeScript(`return document.querySelector('${selector}') !== null`);
    expect(elementExists).to.equal(expected);
}

// quick pairing selectors
const bulletArray = [
    '[data-id="1+0"]',
    '[data-id="2+1"]'
];
const blitzArray = [
    '[data-id="3+0"]',
    '[data-id="5+0"]',
    '[data-id="3+2"]',
    '[data-id="5+3"]'
];

describe('Test Quick Pair Removal', function() {
    this.timeout(0); // Disable Mocha's timeout

    before(async function() {
        await driver.get('https://lichess.org');
    });

    it('should check removal of bullet in quick pairing', async function() {
        for (let selector of bulletArray) {
            await doesElementExist(selector, false);
        }
    });

    it('should check removal of blitz in quick pairing', async function() {
        await driver.get('chrome-extension://hggjliiolhipmgoomadfmpdlafknhpmd/options.html');
        await driver.findElement(By.id('block-blitz')).click();
        await driver.findElement(By.id('save')).click();
        await driver.get('https://lichess.org');

        for (let selector of blitzArray) {
            await doesElementExist(selector, false);
        }
    });

    after(async function() {
        await driver.quit();
    });
});