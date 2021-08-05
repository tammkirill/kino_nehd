const { Given, When, Then } = require("@cucumber/cucumber");

const assert = require("assert");

//** Check if link for snippets is correct*/

const MainPage = require("../../commands/commands-films-today");

const PageObjects = require("../../pageobjects/films-today/pageobject");

const Command = require("../../commands/commands-films-today");

const SecondObjects = require("../../pageobjects/film/pageobject");

Given(/^I am on the (.*) page$/, async main => {
  await MainPage.open(main || "");
});

When(/^I see Carousel with Snippets$/, async () => {
  const snippetsArr = await PageObjects.snipetsArray;

  for (let i = 0; i < snippetsArr.length; i++) {
    if (!snippetsArr[i].isExisting()) {
      assert.fail("Snippet is not exist on the page");
    }
  }
});

Then(/^I can see rigth rating of the film$/, async () => {
  const snippetsArr = await PageObjects.snipetsArray;

  snippetsArr.splice(0, 1);

  let linkArr = await Command.smthArray(snippetsArr, PageObjects.getChildA);

  let ratingArr = await Command.smthArray(snippetsArr, PageObjects.getRating);

  for (let i = 0; i < linkArr.length - 1; i++) {
    let ratingItem = await ratingArr[i];

    let ratingFilm = await ratingItem.getText();

    let linkItem = await linkArr[i];

    await linkItem.click();

    const rightRating = await SecondObjects.filmRating;

    let ratingText = await rightRating.getText();

    //get strictly number of rating
    ratingText = ratingText.split(/\s/);

    //trick: there is error on the site
    if (ratingText[0] === "–" && ratingFilm === "—") {
      ratingFilm = "–";
    }

    assert.strictEqual(ratingText[0], ratingFilm);

    await browser.back();
  }
});
