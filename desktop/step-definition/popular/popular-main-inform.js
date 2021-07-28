const { Given, When, Then } = require("@cucumber/cucumber");

const assert = require("assert");

//** Check if link for snippets is correct*/

const MainPage = require("../../commands/commands-films-today");

const PageObjects = require("../../pageobjects/popular/pageobject");

const Command = require("../../commands/commands-films-today");

const SecondObjects = require("../../pageobjects/film/pageobject");

Given(/^I am on the (.*) page$/, async popular => {
  await MainPage.open(popular || "");
});

When(/^I can see film snippet$/, async () => {
  const snippetsArr = await PageObjects.snippetArr;

  for (let i = 0; i < snippetsArr.length; i++) {
    if (!snippetsArr[i].isDisplayed()) {
      assert.fail("Snippet is not exist on the page");
    }
  }
});

//Then 1
Then(/^I should see right title of the film$/, async () => {
  const snippetsArr = await PageObjects.snippetArr;

  let linkArr = await Command.smthArray(snippetsArr, PageObjects.getLink);

  let titleArr = await Command.smthArray(snippetsArr, PageObjects.getFilmTitle);

  for (let i = 0; i < linkArr.length; i++) {
    let titleItem = await titleArr[i];

    let titleFilm = await titleItem.getText();

    let linkItem = await linkArr[i];

    await linkItem.click();

    let stringURL = await browser.getUrl();

    let rightName;

    //check is film or series
    if (await Command.isFilmLink(stringURL)) {
      rightName = await SecondObjects.filmTitle;
    } else {
      rightName = await SecondObjects.serialTitle;
    }

    let nameText = await rightName.getText();

    //Check if titles is equal
    if (await Command.compareTitles(titleFilm, nameText)) {
      assert.fail(
        "Name on the snippet is {titleFilm}".replace("{titleFilm}", titleFilm)
      );
    }

    await browser.back();
  }
});

//And 1 (flacky)
Then(/^I should see right year and eng name$/, async () => {
  const snippetsArr = await PageObjects.snippetArr;

  let linkArr = await Command.smthArray(snippetsArr, PageObjects.getLink);

  let yearArr = await Command.smthArray(
    snippetsArr,
    PageObjects.getFilmEngYear
  );

  for (let i = 0; i < linkArr.length; i++) {
    let yearItem = await yearArr[i];

    let yearFilm = await yearItem.getText();

    yearFilm = yearFilm.split(", ");

    let linkItem = await linkArr[i];

    await linkItem.click();

    let stringURL = await browser.getUrl();

    let rightEng;

    let rightYear;

    let stringEng;

    let stringYear;

    //check is film or series
    if (await Command.isFilmLink(stringURL)) {
      rightEng = await SecondObjects.engName;

      rightYear = await SecondObjects.filmYear;

      stringEng = await rightEng[0].getText();

      stringYear = await rightYear.getText();
    } else {
      rightEng = await SecondObjects.serialEng;

      rightYear = await SecondObjects.serialYear;

      let tmpYear = await rightYear.getText();

      tmpYear = tmpYear.slice(0, 4);

      stringYear = tmpYear;

      stringEng = await rightEng.getText();
    }

    assert.strictEqual(yearFilm[0], stringEng);

    assert.strictEqual(yearFilm[1].slice(0, 4), stringYear);

    await browser.back();
  }
});
