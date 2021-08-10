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

  Command.checkArray(snippetsArr, Command.checkExistance);
});

Then(/^I can see right title of the film$/, async () => {
  const snippetsArr = await PageObjects.snipetsArray;

  let linkArr = await Command.smthArray(snippetsArr, PageObjects.getChildA);

  let titleArr = await Command.smthArray(snippetsArr, PageObjects.getName);

  const rightName = await SecondObjects.filmTitle;

  await Command.checkFilmTitle(linkArr, titleArr, rightName, browser);
});

//flaky test
Then(/^I can see right year and genre$/, async () => {
  const snippetsArr = await PageObjects.snipetsArray;

  let linkArr = await Command.smthArray(snippetsArr, PageObjects.getChildA);

  let genreArr = await Command.smthArray(snippetsArr, PageObjects.getYearGenre);

  const rightGenre = await SecondObjects.filmGenreArr;

  const rightYear = await SecondObjects.filmYear;

  await Command.checkFilmGenre(linkArr, genreArr, rightYear, rightGenre, browser);
});
