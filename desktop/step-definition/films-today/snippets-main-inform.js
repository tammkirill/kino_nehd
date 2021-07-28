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

Then(/^I can see right title of the film$/, async () => {
  const snippetsArr = await PageObjects.snipetsArray;

  snippetsArr.splice(0, 1);

  let linkArr = await Command.smthArray(snippetsArr, PageObjects.getChildA);

  let titleArr = await Command.smthArray(snippetsArr, PageObjects.getName);

  for (let i = 0; i < linkArr.length - 1; i++) {
    let titleItem = await titleArr[i];

    let titleFilm = await titleItem.getText();

    let linkItem = await linkArr[i];

    await linkItem.click();

    const rightName = await SecondObjects.filmTitle;

    let nameText = await rightName.getText();

    //Check if titles are equal
    if (await Command.compareTitles(titleFilm, nameText)) {
      assert.fail(
        "Name on the snippet is {titleFilm}".replace("{titleFilm}", titleFilm)
      );
    }

    await browser.back();
  }
});

//flaky test
Then(/^I can see right year and genre$/, async () => {
  const snippetsArr = await PageObjects.snipetsArray;

  snippetsArr.splice(0, 1);

  let linkArr = await Command.smthArray(snippetsArr, PageObjects.getChildA);

  let genreArr = await Command.smthArray(snippetsArr, PageObjects.getYearGenre);

  for (let i = 0; i < linkArr.length - 1; i++) {
    let genreItem = await genreArr[i];

    let genreFilm = await genreItem.getText();

    genreFilm = genreFilm.split(", ");

    let linkItem = await linkArr[i];

    await linkItem.click();

    const rightGenre = await SecondObjects.filmGenreArr;

    const rightYear = await SecondObjects.filmYear;

    let stringGenre = await rightGenre.getText();

    //split all genres in the line
    stringGenre = await stringGenre.split(/(,\s)|\n/);

    let stringYear = await rightYear.getText();

    //check if year is right
    assert.strictEqual(genreFilm[0], stringYear);

    //check if genre is right
    assert.strictEqual(genreFilm[1], stringGenre[0]);

    await browser.back();
  }
});
