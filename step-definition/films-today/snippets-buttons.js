const { Given, When, Then } = require('@cucumber/cucumber');

const assert = require('assert');

//** Check if link for snippets is correct*/

const MainPage = require('../../commands/commands-films-today');

const PageObjects = require('../../pageobjects/films-today/pageobject');

const Command = require('../../commands/commands-films-today');

const SecondObjects = require('../../pageobjects/film/pageobject');



Given (/^I am on the main page$/, async () => {
    await MainPage.open("");
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

    let ticketsArr = await Command.smthArray(snippetsArr, PageObjects.getSmallTicket);

    let arrowsToday = await PageObjects.getArrows(buttonPlace);

    await arrowsToday[1].click();

    await arrowsToday[0].waitForClickable({ timeout: 3000 });

    await arrowsToday[0].click();
    

});

//And 1
Then (/^I can click left button$/, async () => {
    
    //get Array of snippets
    const snippetsArr = await PageObjects.snipetsArray;

    snippetsArr.splice(0,1);

    

});
