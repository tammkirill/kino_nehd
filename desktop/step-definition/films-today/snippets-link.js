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

  for (let i = 0; i < snippetsArr.length; i++) {
    if (!snippetsArr[i].isExisting()) {
      assert.fail("Snippet is not exist on the page");
    }
  }
});

Then(/^I click on Snippet and should be on the (.+)$/, async linkName => {
  const snippetsArr = await PageObjects.snipetsArray;

  let linkArr = await Command.smthArray(snippetsArr, PageObjects.getChildA);

  let regExp = Regular.filmNumber;

  for (let i = 0; i < linkArr.length - 1; i++) {
    let linkItem = await linkArr[i];

    await linkItem.click();

    stringURL = await browser.getUrl();

    //Check if link have right form
    if (!await Command.compareLinks(stringURL, linkName, regExp)) {
      assert.fail(
        "Link {stringURL} is incorrect".replace("{stringURL}", stringURL)
      );
    }

    await browser.back();
  }
});
