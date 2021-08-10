const { Given, When, Then } = require("@cucumber/cucumber");

const assert = require("assert");

//** Check if link for snippets is correct*/

const MainPage = require("../../commands/commands-films-today");

const PageObjects = require("../../pageobjects/films-today/pageobject");

const Command = require("../../commands/commands-films-today");

const SecondObjects = require("../../pageobjects/film/pageobject");

Given(/^I am on the main page$/, async ()  => {
  await MainPage.open(MainPage.mainLink);
});

When(/^I see Carousel with Snippets$/, async () => {
  const snippetsArr = await PageObjects.snipetsArray;

  await Command.checkArray(snippetsArr, Command.checkExistance);
});

Then(/^I can see rigth rating of the film$/, async () => {
  const snippetsArr = await PageObjects.snipetsArray;

  let linkArr = await Command.smthArray(snippetsArr, PageObjects.getChildA);

  let ratingArr = await Command.smthArray(snippetsArr, PageObjects.getRating);

  const rightRating = await SecondObjects.filmRating;

  await Command.checkRating(linkArr, ratingArr, rightRating, browser);
});
