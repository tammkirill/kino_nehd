const { Given, When, Then } = require("@cucumber/cucumber");

const assert = require("assert");

//** Check if link for snippets is correct*/

const MainPage = require("../../commands/commands-films-today");

const PageObjects = require("../../pageobjects/popular/pageobject");

const Command = require("../../commands/commands-films-today");

const Regular = require("../../commands/regular-expressions");

Given(/I am on the (.+) page$/, async popular => {
  await MainPage.open(popular || "");
});

When(/^I can see film snippet$/, async () => {
  const snippetsArr = await PageObjects.snippetArr;

  for (let i = 0; i < snippetsArr.length; i++) {
    if (!snippetsArr[i].isDisplayed()) {
      assert.fail("Snippet {i} is not displayed".replace("{i}", i));
    }
  }
});

Then(/^I should be able to go to the page of this film: (.+)$/, async (linkName) => {
    const snippetsArr = await PageObjects.snippetArr;

    let linksArr = await Command.smthArray(snippetsArr, PageObjects.getLink);

    let regExp = Regular.filmOrSeriesNumber;

    for (let i = 0; i < linksArr.length; i++) {
      let linkItem = await linksArr[i];

      await linkItem.click();

      let stringURL = await browser.getUrl();

      //Check if link have right form
      if (!await Command.compareLinks(stringURL, linkName, regExp)) {
        assert.fail(
          "Link {linkName} is incorrect".replace("{linkName}", stringURL)
        );
      }

      await browser.back();
    }
  }
);
