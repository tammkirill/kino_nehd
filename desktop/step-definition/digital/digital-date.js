const { Given, When, Then } = require("@cucumber/cucumber");

const assert = require("assert");

//** Check if link for snippets is correct*/

const MainPage = require("../../commands/commands-films-today");

const PageObjects = require("../../pageobjects/digital/pageobject");

const Command = require("../../commands/commands-films-today");

const SecondObjects = require("../../pageobjects/film/pageobject");

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

Then(/^I should see Snippet with right date of release$/, async () => {
  const carouselDigital = await PageObjects.carouselDigital;

  let snippetsArr = await PageObjects.getSnippetsArray(carouselDigital);

  for (let i = 0; i < snippetsArr.length; i++) {
    let snippetsItem = await snippetsArr[i];

    await snippetsItem.scrollIntoView();

    let snippetsText = ( await snippetsItem.getText() ).split(/\s/);

    let snippetsDate = snippetsText[0];

    snippetsDate = await Command.getRusDate(snippetsDate);

    await snippetsItem.click();

    let filmFields = await SecondObjects.fieldsDicr;

    let rightText = ( await  filmFields[filmFields.length-1].getText() ).split(', ');

    let rightDate = rightText[0];

    //cpmpare digits from links
    assert.strictEqual(rightDate, snippetsDate);

    await browser.back();
  }
});
