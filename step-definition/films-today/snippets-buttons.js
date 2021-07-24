const { Given, When, Then } = require('@cucumber/cucumber');

const assert = require('assert');

//** Check if link for snippets is correct*/

const MainPage = require('../../commands/commands-films-today');

const PageObjects = require('../../pageobjects/films-today/pageobject');

const Command = require('../../commands/commands-films-today');

const SecondObjects = require('../../pageobjects/film/pageobject');



Given (/^I am on the (.+) page$/, async (main) => {
    await MainPage.open(main);
});

When (/^I see Carousel with Snippets$/, async () => {
    //get Array of snippets
    const snippetsArr = await PageObjects.snipetsArray;

    for (let i = 0; i < snippetsArr.length; i++) 
    {
        if (!snippetsArr[i].isExisting())
        {
            assert.fail('Snippet is not exist on the page');
        }
    }

});

//Then 1
Then (/^I can click right button$/, async () => {
    
    //get Array of snippets
    const snippetsArr = await PageObjects.snipetsArray;

    snippetsArr.splice(0,1);

    const buttonPlace = await PageObjects.todayCarousel;

    //get 2 arrows
    let arrowsToday = await PageObjects.getArrows(buttonPlace);

    //click right button
    await arrowsToday[1].click();

    //wait to see left button
    await arrowsToday[0].waitForClickable({ timeout: 3000, timeoutMsg: "Left button didn't show" });

    //check if new snippets are displayed
    for (let i = 4; i < 6; i++)
    {

        if (!await snippetsArr[i].isDisplayedInViewport())
        {
            assert.fail('New snippets are not displayed');
        }

    }

});

//And 1
Then (/^I can click left button$/, async () => {
    
    //get Array of snippets
    const snippetsArr = await PageObjects.snipetsArray;

    snippetsArr.splice(0,1);

    const buttonPlace = await PageObjects.todayCarousel;

    //get 2 arrows
    let arrowsToday = await PageObjects.getArrows(buttonPlace);

    //wait to see left button
    await arrowsToday[0].waitForClickable({ timeout: 3000, timeoutMsg: "Left button didn't show" });

    //click on the left button
    await arrowsToday[0].click();

    //old snippets are seen
    for (let i = 0; i < 3; i++)
    {

        await snippetsArr[i].waitForDisplayed({timeout: 4000, timeoutMsg: "Snippets not shown"});
        
    }

    await arrowsToday[0].waitForClickable({timeout: 4000,  timeoutMsg: "Arrow still shown", reverse: true})

    //check if Left arrow shown in the most left position
    //if (await arrowsToday[0].isDisplayedInViewport())
    //{
    //    assert.fail('Left arrow shown');
    //}

});
