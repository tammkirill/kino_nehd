const { Given, When, Then } = require("@cucumber/cucumber");

const assert = require("assert");

//** Check if link for films today is correct*/

const MainPage = require("../../commands/commands-films-today");

const PageObjects = require("../../pageobjects/films-today/pageobject");

const Command = require("../../commands/commands-films-today");

const Regular = require("../../commands/regular-expressions");

Given(/^I am on the main page$/, async ()  => {
  await MainPage.open(MainPage.mainLink);
});

When(/^I see button named (.+) and click it$/, async buttonName => {
  const carousel = await PageObjects.headingCarousel;

  //field with a link and a name
  let carouselLink = await PageObjects.getChildA(carousel[0]);

  await Command.checkText(carouselLink, buttonName);

  await carouselLink.click();
});

Then(/^I should be on the page of today's films: (.+)$/, async linkName => {
  let stringURL = await browser.getUrl();

  let regExp = Regular.linkAfisha;

  await Command.compareLinks(stringURL, linkName, regExp)
});
