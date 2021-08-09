const { Given, When, Then } = require("@cucumber/cucumber");

const assert = require("assert");

//** Check if link for snippets is correct*/

const MainPage = require("../../commands/commands-films-today");

const PageObjects = require("../../pageobjects/digital/pageobject");

const Command = require("../../commands/commands-films-today");

const Regular = require("../../commands/regular-expressions");

Given(/I am on the (.+) page$/, async comming => {
  await MainPage.open(comming || "");
});

When(/^I see Carousel with digital releases$/, async () => {
  const carouselDigital = await PageObjects.carouselDigital;

  let snippetsArr = await PageObjects.getSnippetsArray(carouselDigital);

  //check if all snippets are displayed
  for (let i = 0; i < snippetsArr.length; i++) {
    if (!snippetsArr[i].isDisplayed()) {
      assert.fail("Snippet {i} is not displayed".replace("{i}", i));
    }
  }
});

Then(/^I can click on Snippet and should be on the (.+)$/, async linkName => {
  const carouselDigital = await PageObjects.carouselDigital;

  let snippetsArr = await PageObjects.getSnippetsArray(carouselDigital);

  let regExp = Regular.filmNumber;

  for (let i = 0; i < snippetsArr.length; i++) {
    let snippetsItem = await snippetsArr[i];

    await snippetsItem.scrollIntoView();

    await snippetsItem.click();

    let stringURL = await browser.getUrl();

    //Check if link have right form
    if (!await Command.compareLinks(stringURL, linkName, regExp)) {
      assert.fail(
        "Link {linkName} is incorrect".replace("{linkName}", stringURL)
      );
    }

    await browser.back();
  }
});
