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
  //get Array of snippets
  const snippetsArr = await PageObjects.snipetsArray;

  for (let i = 0; i < snippetsArr.length; i++) {
    if (!snippetsArr[i].isExisting()) {
      assert.fail("Snippet is not exist on the page");
    }
  }
});

//Then 1
Then(/^I can see ticket icon$/, async () => {
  const snippetsArr = await PageObjects.snipetsArray;

  snippetsArr.splice(0, 1);

  let ticketsArr = await Command.smthArray(
    snippetsArr,
    PageObjects.getSmallTicket
  );

  for (let i = 0; i < ticketsArr.length - 1; i++) {
    let ticketsItem = await ticketsArr[i];

    if (!await ticketsItem.isDisplayed()) {
      assert.fail("Ticket number {i} is not displayed".replace("{i}", i));
    }
  }
});

//And 1
Then(/^I can see bigger ticket icon only when focus snippet$/, async () => {
  const snippetsArr = await PageObjects.snipetsArray;

  snippetsArr.splice(0, 1);

  let ticketsBigArr = await Command.smthArray(
    snippetsArr,
    PageObjects.getBigTicket
  );

  for (let i = 0; i < ticketsBigArr.length - 1; i++) {
    let ticketsBigItem = await ticketsBigArr[i];

    //check if icon is not displayed untill focused
    if (await ticketsBigItem.isDisplayed()) {
      assert.fail(
        "Ticket number {i} is displayed before focused".replace("{i}", i)
      );
    }

    await snippetsArr[i].waitForClickable({ timeout: 1000 });

    //focusing item
    await ticketsBigItem.moveTo();

    //Wait to be displayed after focus
    if (!await ticketsBigItem.isDisplayedInViewport()) {
      assert.fail(
        "Ticket number {i} is not displayed after focus".replace("{i}", i)
      );
    }

    assert.strictEqual(await ticketsBigItem.getText(), "Билеты");
  }
});

//And 2
Then(/^I can click on ticket icon and get to (.+)$/, async linkName => {
  const snippetsArr = await PageObjects.snipetsArray;

  snippetsArr.splice(0, 1);

  let regExp = /^\d+\/afisha\/city\/\d+\/(day_view\/\d{4}-\d{2}-\d{2}\/){0,1}$/;

  let ticketsBigArr = await Command.smthArray(
    snippetsArr,
    PageObjects.getBigTicket
  );

  for (let i = 0; i < ticketsBigArr.length - 1; i++) {
    let ticketsBigItem = await ticketsBigArr[i];

    await ticketsBigItem.click();

    stringURL = await browser.getUrl();

    //Check if link has right form
    if (!await Command.compareLinks(stringURL, linkName, regExp)) {
      assert.fail(
        "Link {stringURL} is incorrect".replace("{stringURL}", stringURL)
      );
    }

    await browser.back();
  }
});
