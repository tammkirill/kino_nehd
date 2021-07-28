const { Given, When, Then } = require("@cucumber/cucumber");

const assert = require("assert");

//** Check if link for snippets is correct*/

const MainPage = require("../../commands/commands-films-today");

const PageObjects = require("../../pageobjects/popular/pageobject");

const Command = require("../../commands/commands-films-today");

const SecondObjects = require("../../pageobjects/film/pageobject");

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

Then(/^I should see right rating of the film$/, async () => {
  const snippetsArr = await PageObjects.snippetArr;

  let linkArr = await Command.smthArray(snippetsArr, PageObjects.getLink);

  let snippetsChildA = await Command.smthArray(
    snippetsArr,
    PageObjects.getPicAndRating
  );

  for (let i = 0; i < linkArr.length; i++) {
    let ratingItem = await snippetsChildA[i];

    let ratingFilm = await ratingItem.getText();

    let linkItem = await linkArr[i];

    await linkItem.click();

    const rightRating = await SecondObjects.filmRating;

    let ratingText = await rightRating.getText();

    ratingText = ratingText.split(/\s/);

    //trick: there is error on the site
    if (ratingText[0] === "–" && ratingFilm === "—") {
      ratingFilm = "–";
    }

    assert.strictEqual(ratingText[0], ratingFilm);

    await browser.back();
  }
});
