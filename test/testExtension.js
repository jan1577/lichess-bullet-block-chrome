const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { expect } = require('chai');

const chromeOptions = new chrome.Options();
chromeOptions.addArguments(`--load-extension=${__dirname}/../src/`, '--lang=en');
chromeOptions.addArguments('--headless=new');

const driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(chromeOptions)
    .build();

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

async function doesElementExist(selector) {
    return await driver.executeScript(`return document.querySelector('${selector}') !== null`);
}

async function isElementDisplayed(selector) {
    return await driver.executeScript(`return document.querySelector('${selector}').style.display !== 'none'`);
}

async function setOptions(blockBlitz=false, enableQuotes=false, blockPuzzleVariants=false) {
    await driver.get('chrome-extension://hggjliiolhipmgoomadfmpdlafknhpmd/options.html');

    if (blockBlitz) {
        await driver.executeScript("document.getElementById('block-blitz').checked = true;");
    } else {
        await driver.executeScript("document.getElementById('enable-blitz').checked = true;");
    }

    if (enableQuotes) {
        await driver.executeScript("document.getElementById('enable-quotes').checked = true;");
    } else {
        await driver.executeScript("document.getElementById('disable-quotes').checked = true;");
    }
        
    await driver.wait(until.elementLocated(By.id('block-storm')), 5000);
    await driver.executeScript("document.getElementById('block-storm').checked = arguments[0];", blockPuzzleVariants);
    await driver.wait(until.elementLocated(By.id('block-streak')), 5000);
    await driver.executeScript("document.getElementById('block-streak').checked = arguments[0];", blockPuzzleVariants);
    await driver.wait(until.elementLocated(By.id('block-racer')), 5000);
    await driver.executeScript("document.getElementById('block-racer').checked = arguments[0];", blockPuzzleVariants);

    await driver.findElement(By.id('save')).click();
}


describe('Test Quick Pair Removal', function() {
    this.timeout(0); // Disable Mocha's timeout

    it('should check removal of bullet in quick pairing', async function() {
        await driver.get('https://lichess.org');
        
        for (let selector of bulletArray) {
            expect(await doesElementExist(selector), false);
        }
    });

    it('should check removal of blitz in quick pairing', async function() {
        setOptions(true, false, false);
        await driver.get('https://lichess.org');

        for (let selector of blitzArray) {
            expect(await doesElementExist(selector), false);
        }
    });

    it('should check if quotes are added', async function() {
        setOptions(false, true, false);
        
        await driver.get('https://lichess.org');
        expect(await doesElementExist('#quote'), true);
    });

    it('should check if puzzle variants are removed', async function() {
        await setOptions(false, false, true)
        await driver.get('https://lichess.org');

        expect(await isElementDisplayed('#topnav > section:nth-child(2) > div > a:nth-child(4)')).to.be.false;
        expect(await isElementDisplayed('#topnav > section:nth-child(2) > div > a:nth-child(5)')).to.be.false;
        expect(await isElementDisplayed('#topnav > section:nth-child(2) > div > a:nth-child(6)')).to.be.false;
       
        await driver.get('https://lichess.org');
    });

    after(async function() {
        await driver.quit();
    });
});