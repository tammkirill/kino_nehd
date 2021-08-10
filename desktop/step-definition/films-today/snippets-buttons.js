const { Given, When, Then } = require("@cucumber/cucumber");

//** Check if link for snippets is correct*/

const MainPage = require("../../commands/commands-films-today");

const Command = require("../../commands/commands-films-today"); 

const PageObjects = require("../../pageobjects/films-today/pageobject");

Given(/^I am on the main page$/, async ()  => {
  await MainPage.open(MainPage.mainLink);
});

When(/^I see Carousel with Snippets$/, async () => {
  const snippetsArr = await PageObjects.snipetsArray;

  Command.checkArray(snippetsArr, Command.checkExistance);
});

//Then 1
Then(/^I can click right button$/, async () => {
  const snippetsArr = await PageObjects.snipetsArray;

  const buttonPlace = await PageObjects.todayCarousel;

  //get 2 arrows
  let arrowsToday = await PageObjects.getArrows(buttonPlace);

  await Command.checkArrowsWork(arrowsToday[1], snippetsArr, 4, 6);

  //wait to see left button
  await arrowsToday[0].waitForClickable({
    timeout: 3000,
    timeoutMsg: "Left button didn't show"
  });
});

//And 1
Then(/^I can click left button$/, async () => {
  const snippetsArr = await PageObjects.snipetsArray;

  const buttonPlace = await PageObjects.todayCarousel;

  //get 2 arrows
  let arrowsToday = await PageObjects.getArrows(buttonPlace);

  //wait to see left button
  await arrowsToday[0].waitForClickable({
    timeout: 3000,
    timeoutMsg: "Left button didn't show"
  });

  await Command.checkArrowsWork(arrowsToday[0], snippetsArr, 0, 3);

  //wait for left button to disapeare
  await arrowsToday[0].waitForClickable({
    timeout: 4000,
    timeoutMsg: "Arrow still shown",
    reverse: true
  });
});
