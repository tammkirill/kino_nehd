const { Given, When, Then } = require("@cucumber/cucumber");

const assert = require("assert");

//** Check if link for snippets is correct*/

const MainPage = require("../../../desktop/commands/commands-films-today");

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
  
  for (let i = 0; i < snippetsArr.length; i++){
    snippetsArr[i].waitForClickable({
      timeout: 2000,
      timeoutMsg: "Item {i} is not clickable".replace('{i}', i),
    })    
  }
});

Then(/^I should see right english name$/, async () => {
  let snippetsArr = await PageObjects.snippetsArr;

  let snippetsEngName = await Command.smthArray(snippetsArr, PageObjects.getEng);

  for (let i = 0; i < snippetsArr.length; i++) {
    snippetsArr = await PageObjects.snippetsArr;

    snippetsEngName = await Command.smthArray(snippetsArr, PageObjects.getEng);

    let snippetsItem = await snippetsArr[i];

    await snippetsItem.scrollIntoView();

    let snipNameItem = await snippetsEngName[i];

    let snippetName = await snipNameItem.getText();

    await snippetsItem.click();

    let nameItem = await SecondObjects.filmEngTitle;

    let rightName = await nameItem.getText();

    //Check if link have right form
    assert.strictEqual(rightName, snippetName);

    await browser.back();
  }

});