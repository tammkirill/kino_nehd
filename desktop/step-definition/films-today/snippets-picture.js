const { Given, When, Then } = require("@cucumber/cucumber");

const assert = require("assert");

//** Check if link for snippets is correct*/

const MainPage = require("../../commands/commands-films-today");

const PageObjects = require("../../pageobjects/films-today/pageobject");

const Command = require("../../commands/commands-films-today");

const SecondObjects = require("../../pageobjects/film/pageobject");

const Regular = require("../../commands/regular-expressions");
const { getPicture } = require("../../pageobjects/films-today/pageobject");

Given(/^I am on the main page$/, async () => {
  await MainPage.open(MainPage.mainLink);
});

When(/^I see Carousel with Snippets$/, async () => {
  const snippetsArr = await PageObjects.snipetsArray;

  Command.checkArray(snippetsArr, Command.checkExistance);
});

Then(/^I can see right picture of the film$/, async () => {
  const snippetsArr = await PageObjects.snipetsArray;

  let linkArr = await Command.smthArray(snippetsArr, PageObjects.getChildA);

  let pictureArr = await Command.smthArray(snippetsArr, PageObjects.getPicture);

  //regExp for part of link
  let regExp = Regular.filmPoster;

  const rightPoster = await SecondObjects.poster;

  await Command.checkPoster(
    linkArr,
    pictureArr,
    rightPoster,
    regExp,
    browser,
    SecondObjects.getPicture
  );
});
