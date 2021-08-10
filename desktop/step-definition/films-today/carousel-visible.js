const { Given, When, Then } = require("@cucumber/cucumber");

const assert = require("assert");
const Command = require("../../commands/commands-films-today");

//** Check if courusel of films today is visible and have correct name */

const MainPage = require("../../commands/commands-films-today");

const PageObjects = require("../../pageobjects/films-today/pageobject");

Given(/^I am on the main page$/, async ()  => {
  await MainPage.open(MainPage.mainLink);
});

When(/^I just wait$/, async () => {});

Then(/^I should see Carousel with (.+)$/, async name => {
  const carousel = await PageObjects.headingCarousel;

  await Command.checkVisible(carousel[0], false);

  //get carousel Name class
  let carouselName = await PageObjects.getChildA(carousel[0]);

  Command.checkText(carouselName, name)
});
