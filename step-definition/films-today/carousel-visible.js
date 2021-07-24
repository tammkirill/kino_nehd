const { Given, When, Then } = require('@cucumber/cucumber');

const assert = require('assert');

//** Check if courusel of films today is visible and have correct name */

const MainPage = require('../../commands/commands-films-today');

const PageObjects = require('../../pageobjects/films-today/pageobject');

Given (/^I am on the (.+) page$/, async (main) => {
    await MainPage.open(main);
});

When (/^I just wait$/, async () => {

});

Then (/^I should see Carousel with (.+)$/, async (name) => {
    const carousel = await PageObjects.headingCarousel;

    //Check if carousel films today is visible
    if (! await carousel[0].isDisplayed()){
        assert.fail('Carousel is not visible');
    }

    //get carousel Name class
    let carouselName = await carousel[0].$('h3');

    //Check if Courusel name is what we are expecting
    assert.strictEqual(name, await carouselName.getText());
}); 