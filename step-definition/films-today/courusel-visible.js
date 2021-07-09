const { Given, When, Then } = require('@cucumber/cucumber');

const assert = require('assert');

//** Check if courusel of films today is visible and have correct name */

const MainPage = require('../../commands/commands-films-today');

const PageObjects = require('../../pageobjects/films-today/pageobject');

Given (/^I am on the main page$/, async () => {
    await MainPage.open("");
});

When (/^I just wait$/, async () => {

});

Then (/^I should see Courusel with (.+)$/, async (name) => {
    let courusel = await PageObjects.headingCarousel;

    //Check if courusel films today is visible
    if (! await courusel[0].isDisplayed()){
        assert.fail('Courusel is not visible');
    }

    //get courusel Name
    let couruselName = await courusel[0].$('h3').getText;

    //Check if Courusel name is what we are expecting
    assert.strictEqual(name, await couruselName);
}); 