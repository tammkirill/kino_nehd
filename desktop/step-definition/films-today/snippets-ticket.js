const { Given, When, Then } = require("@cucumber/cucumber");

const assert = require("assert");

//** Check if link for snippets is correct*/

const MainPage = require("../../commands/commands-films-today");

const PageObjects = require("../../pageobjects/films-today/pageobject");

const Command = require("../../commands/commands-films-today");

const Regular = require("../../commands/regular-expressions");

Given(/^I am on the main page$/, async () => {
  await MainPage.open(MainPage.mainLink);
});

When(/^I see Carousel with Snippets$/, async () => {
  const snippetsArr = await PageObjects.snipetsArray;

  await Command.checkArray(snippetsArr, Command.checkExistance);
});

//Then 1
Then(/^I can see ticket icon$/, async () => {
  const snippetsArr = await PageObjects.snipetsArray;

  let ticketsArr = await Command.smthArray(
    snippetsArr,
    PageObjects.getSmallTicket
  );

  ticketsArr = ticketsArr.slice(0, ticketsArr.length - 1);

  await Command.checkArray(ticketsArr, Command.checkExistance);

  await Command.checkArray(ticketsArr, Command.checkVisible);
});

//And 1
Then(/^I can see bigger ticket icon only when focus snippet$/, async () => {
  const snippetsArr = await PageObjects.snipetsArray;

  let ticketsBigArr = await Command.smthArray(
    snippetsArr,
    PageObjects.getBigTicket
  );

  const nameTicket = "Билеты";

  await Command.checkBigTicket(snippetsArr, ticketsBigArr, nameTicket);
});

//And 2
Then(/^I can click on ticket icon and get to (.+)$/, async linkName => {
  const snippetsArr = await PageObjects.snipetsArray;

  let regExp = Regular.filmAfishTic;

  let ticketsBigArr = await Command.smthArray(
    snippetsArr,
    PageObjects.getBigTicket
  );

  await Command.checkSnippetLinks(ticketsBigArr, linkName, regExp, browser);
});
