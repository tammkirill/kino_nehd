const { Given, When, Then } = require("@cucumber/cucumber");

const assert = require("assert");

//** Check if link for snippets is correct*/

const MainPage = require("../../commands/commands-films-today");

const PageObjects = require("../../pageobjects/films-today/pageobject");

const Command = require("../../commands/commands-films-today");

const SecondObjects = require("../../pageobjects/film/pageobject");

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

Then(/^I can see right picture of the film$/, async () => {
  const snippetsArr = await PageObjects.snipetsArray;

  let linkArr = await Command.smthArray(snippetsArr, PageObjects.getChildA);

  let pictureArr = await Command.smthArray(snippetsArr, PageObjects.getPicture);

  //regExp for part of link
  let regExp = Regular.filmPoster;

  for (let i = 0; i < linkArr.length - 1; i++) {
    let pictureItem = await pictureArr[i];

    let pictureLink;

    if (await pictureItem.isDisplayed()) {
      pictureLink = await pictureItem.getAttribute("src");
    } else {
      pictureLink = await pictureItem.getAttribute("data-src");
    }

    let tmpSize;

    for (let i = pictureLink.length - 1; i >= 0; i--) {
      if ((await pictureLink[i]) == "/") {
        tmpSize = i;
        break;
      }
    }

    linkName = await pictureLink.slice(0, tmpSize + 1);

    let linkItem = await linkArr[i];

    await linkItem.click();

    const rightPoster = await SecondObjects.poster;

    const rightPicture = await SecondObjects.getPicture(rightPoster);

    let rightLink = await rightPicture.getAttribute("src");

    //Check if link have right form
    if (!await Command.compareLinks(rightLink, linkName, regExp)) {
      assert.fail(
        "Link {linkName} is incorrect".replace("{linkName}", linkName)
      );
    }

    await browser.back();
  }
});
