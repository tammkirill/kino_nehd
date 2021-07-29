const { Given, When, Then } = require("@cucumber/cucumber");

const assert = require("assert");

//** Check if link for snippets is correct*/

const MainPage = require("../../commands/commands-films-today");

const PageObjects = require("../../pageobjects/digital-all/pageobject");

const Command = require("../../commands/commands-films-today");

const SecondObjects = require("../../pageobjects/film/pageobject");

Given(/I am on the (.+) page$/, async comming => {
  await MainPage.open(comming || "");
});

When(/^I scrolled all page to the bottom$/, async () => {
  let snippetsArr = await PageObjects.snippetsArr;

  let countSnipp = snippetsArr.length - 1;

  await snippetsArr[countSnipp].scrollIntoView();

  //Had to use explicit wait, no element to catch while page is reloading
  await browser.pause(1000);

  snippetsArr = await PageObjects.snippetsArr;

  while (snippetsArr.length - 1 !== countSnipp) {
    countSnipp = snippetsArr.length - 1;

    await snippetsArr[snippetsArr.length - 1].scrollIntoView();

    await browser.pause(1000);

    snippetsArr = await PageObjects.snippetsArr;
  }
});

Then(/^I should see all snippets$/, async () => {
  let snippetsArr = await PageObjects.snippetsArr;

  //check if all snippets are displayed
  for (let i = 0; i < snippetsArr.length; i++) {
    if (!snippetsArr[i].isDisplayed()) {
      assert.fail("Snippet {i} is not displayed".replace("{i}", i));
    }
  }
});
