const { Given, When, Then } = require("@cucumber/cucumber");

const assert = require("assert");

//** Check if link for snippets is correct*/

const MainPage = require("../../commands/commands-films-today");

const PageObjects = require("../../pageobjects/digital-all/pageobject");

const Command = require("../../../desktop/commands/commands-films-today");

const SecondObjects = require("../../pageobjects/film/pageobject");

Given(/I am on the (.+) page$/, async comming => {
  await MainPage.open(comming || "");
});

When(/^I scrolled all page to the bottom$/, async () => {
  let snippetsArr = await PageObjects.snippetsArr;

  const gnegCloseBut = await PageObjects.gnegPopupClose;

  //if we see gneg popup
  try{
    await gnegCloseBut.waitForClickable({
      timeout: 10000,
      timeoutMsg: "Gneg is not clickable",
    })
  
    await gnegCloseBut.click();
  } catch(e) {
    //do nothing if popup didn't show
  }
  

  await snippetsArr[0].waitForClickable({
    timeout: 2000,
    timeoutMsg: "Item {i} is not clickable".replace('{i}', 0),
  })    
});

Then(/^I can click on Snippet and should be on the (.+)$/, async (linkName) => {
  let snippetsArr = await PageObjects.snippetsArr;

  let regExp = /^(film|series)\/\d+\/$/;

  for (let i = 0; i < snippetsArr.length; i++) {
    snippetsArr = await PageObjects.snippetsArr;

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
