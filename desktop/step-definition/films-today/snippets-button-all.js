const { Given, When, Then } = require('@cucumber/cucumber');

const assert = require('assert');

//** Check if link for snippets is correct*/

const MainPage = require('../../commands/commands-films-today');

const PageObjects = require('../../pageobjects/films-today/pageobject');

const Command = require('../../commands/commands-films-today');

const SecondObjects = require('../../pageobjects/film/pageobject');



Given (/^I am on the (.*) page$/, async (main) => {
    await MainPage.open(main|| "");
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

//And 1
When (/^I scrolled to the right maximum$/, async () => {
    
    //get Array of snippets
    const snippetsArr = await PageObjects.snipetsArray;

    snippetsArr.splice(0,1);

    const buttonPlace = await PageObjects.todayCarousel;

    //get 2 arrows
    let arrowsToday = await PageObjects.getArrows(buttonPlace);

    let buttonLast = await PageObjects.afishaEnd;

    while(!await buttonLast.isDisplayedInViewport())
    {
        //clicks are too fast
        await browser.pause(700);

        //click on the left button
        await arrowsToday[1].click();
    }
   

});


Then (/^I can click on button All Films and get to (.+)$/, async (linkName) => {
    
    let buttonLast = await PageObjects.afishaEnd;

    //click the link
    await buttonLast.click();

    let regExp = /^\d+\/$/;

    let stringURL = await browser.getUrl();

    //Check if link have right form
    if (!await Command.compareLinks(stringURL, linkName, regExp)){
        assert.fail('Link {stringURL} is incorrect'.replace('{stringURL}', stringURL));
    }

});


