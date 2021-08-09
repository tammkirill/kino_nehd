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

When(/^I see button named (.+) and click it$/, async button => {
  const carousel = await PageObjects.headingCarousel;

  //field with a link and a name
  let carouselLink = await carousel[0].$("a");

  //Name of a button is right
  assert.strictEqual(button, await carouselLink.getText());

  await carouselLink.click();
});

Then(/^I should be on the page of today's films: (.+)$/, async linkName => {
  let stringURL = await browser.getUrl();

  let regExp = Regular.linkAfisha;

  if (!await Command.compareLinks(stringURL, linkName, regExp)) {
    assert.fail(
      "Link {stringURL} is incorrect".replace("{stringURL}", stringURL)
    );
  }
});
