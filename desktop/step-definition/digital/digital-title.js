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

Then(/^I should see Snippet with right title$/, async () => {
  const carouselDigital = await PageObjects.carouselDigital;

  let snippetsArr = await PageObjects.getSnippetsArray(carouselDigital);

  for (let i = 0; i < snippetsArr.length; i++) {
    let snippetsItem = await snippetsArr[i];

    await snippetsItem.scrollIntoView();

    let snippetsText = ( await snippetsItem.getText() ).split(/\s/);

    let snippetsTitle = snippetsText[1];

    await snippetsItem.click();

    let filmTitle = await SecondObjects.filmTitle;

    let rightText = ( await filmTitle.getText() ).split(' (');

    let rightTitle = rightText[0];  

    //compare digits from links
    assert.strictEqual(rightTitle, snippetsTitle);

    await browser.back();
  }
});
