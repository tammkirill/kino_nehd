const { Given, When, Then } = require("@cucumber/cucumber");

//** Check if link for snippets is correct*/

const MainPage = require("../../commands/commands-films-today");

const PageObjects = require("../../pageobjects/films-today/pageobject");

const Command = require("../../commands/commands-films-today");

const Regular = require("../../commands/regular-expressions");

Given(/^I am on the main page$/, async ()  => {
  await MainPage.open(MainPage.mainLink);
});

When(/^I see Carousel with Snippets$/, async () => {
  const snippetsArr = await PageObjects.snipetsArray;

  Command.checkArray(snippetsArr, Command.checkExistance)
});

//And 1
When(/^I scrolled to the right maximum$/, async () => {
  const buttonPlace = await PageObjects.todayCarousel;

  //get 2 arrows
  let arrowsToday = await PageObjects.getArrows(buttonPlace);

  let buttonLast = await PageObjects.afishaEnd;

  await Command.clickVisible(buttonLast, arrowsToday[1], browser);
});

Then(/^I can click on button All Films and get to (.+)$/, async linkName => {
  let buttonLast = await PageObjects.afishaEnd;

  await buttonLast.click();

  let regExp = Regular.filmNumber;

  let stringURL = await browser.getUrl();

  //Check if link have right form
  Command.compareLinks(stringURL, linkName, regExp);
});
