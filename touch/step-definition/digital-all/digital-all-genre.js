const { Given, When, Then } = require("@cucumber/cucumber");

const assert = require("assert");

//** Check if link for snippets is correct*/

const MainPage = require("../../../desktop/commands/commands-films-today");

const PageObjects = require("../../pageobjects/digital-all/pageobject");

const Command = require("../../../desktop/commands/commands-films-today");

const SecondObjects = require("../../pageobjects/film/pageobject");

Given(/I am on the (.+) page$/, async comming => {
  await MainPage.open(comming || "");
});

When(/^I scrolled all page to the bottom$/, async () => {
  let snippetsArr = await PageObjects.snippetsArr;

  const gnegCloseBut = await PageObjects.gnegPopupClose;

  //if we see gneg popup
  try{
    await gnegCloseBut.waitForClickable({
      timeout: 10000,
      timeoutMsg: "Gneg is not clickable",
    })
  
    await gnegCloseBut.click();
  } catch(e) {
    //do nothing if popup didn't show
  }
  
  for (let i = 0; i < snippetsArr.length; i++){
    snippetsArr[i].waitForClickable({
      timeout: 2000,
      timeoutMsg: "Item {i} is not clickable".replace('{i}', i),
    })    
  }
});

//Not all has originak name, need rework
Then(/^I should see right genres$/, async () => {
  let snippetsArr = await PageObjects.snippetsArr;

  let snippetsGenres = await Command.smthArray(snippetsArr, PageObjects.getGenres);

  for (let i = 0; i < snippetsArr.length; i++) {
    snippetsArr = await PageObjects.snippetsArr;

    snippetsGenres = await Command.smthArray(snippetsArr, PageObjects.getGenres);

    let snippetsItem = await snippetsArr[i];

    await snippetsItem.scrollIntoView();

    let snipGenresItem = await snippetsGenres[i];

    let snippetGenres = await snipGenresItem.getText();

    await snippetsItem.click();

    let genreItem = await SecondObjects.filmYearAndGenres;

    let rightGenresYear = ( await genreItem.getText() ).split('\n');

    let rightGenres = rightGenresYear[0];

    rightGenres = await Command.splitYearMob(rightGenres);

    snippetGenres = snippetGenres.slice(0, rightGenres.length);

    //Check if link have right form
    assert.strictEqual(rightGenres, snippetGenres);

    await browser.back();
  }
});