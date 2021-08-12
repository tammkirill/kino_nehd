const { Given, When, Then } = require("@cucumber/cucumber");

const assert = require("assert");

const MainPage = require("../../commands/commands-films-today");

const PageObjects = require("../../pageobjects/popular/pageobject");

const Command = require("../../commands/commands-films-today");

Given(/^I am on the (.+) page$/, async popular => {
  await MainPage.open(popular || "");
});

When(/^I see header 1$/, async () => {
  const header1 = await PageObjects.header1;

  await Command.checkVisible(header1);
});

Then(/^I should see it with (\d+)$/, async font_weight => {
  let header1 = await PageObjects.header1;

  let cssWeight = await header1.getCSSProperty("font-weight");

  Command.checkText(cssWeight.value, font_weight);
});
