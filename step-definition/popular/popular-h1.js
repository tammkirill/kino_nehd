const { Given, When, Then } = require('@cucumber/cucumber');

const assert = require('assert');

//** Check if link for films today is correct*/

const MainPage = require('../../commands/commands-films-today');

const PageObjects = require('../../pageobjects/popular/pageobject');

const Command = require('../../commands/commands-films-today')

Given (/^I am on the (.+) page$/, async (popular) => {
    await MainPage.open(popular);
});

When (/^I see header 1$/, async () => {
    
    const header1 = await PageObjects.header1;

    //check if header 1 is displayed
    if (!await header1.isDisplayed())
    {
        assert.fail('Header 1 is not displayed');
    }

});

Then (/^I should see it with (\d+)$/, async (font_weight) => {
    
    let header1 = await PageObjects.header1;

    //get CSS of header 1
    let cssWeight = await header1.getCSSProperty('font-weight');

    assert.strictEqual(cssWeight.value, font_weight);
    
}); 