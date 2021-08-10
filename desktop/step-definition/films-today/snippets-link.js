const { Given, When, Then } = require("@cucumber/cucumber");

const assert = require("assert");

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

  await Command.checkArray(snippetsArr, Command.checkExistance);
});

Then(/^I click on Snippet and should be on the (.+)$/, async linkName => {
  const snippetsArr = await PageObjects.snipetsArray;

  let linkArr = await Command.smthArray(snippetsArr, PageObjects.getChildA);

  let regExp = Regular.filmNumber;

  await Command.checkSnippetLinks(linkArr, linkName, regExp, browser);
});
