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
Then (/^I can see ticket icon$/, async () => {
    
    //get Array of snippets
    const snippetsArr = await PageObjects.snipetsArray;

    snippetsArr.splice(0,1);

    let ticketsArr = await Command.smthArray(snippetsArr, PageObjects.getSmallTicket);

    for (let i = 0; i < ticketsArr.length-1; i++)
    {
        //tmp ticket part
        let ticketsItem = await ticketsArr[i];

        //check if all icons is displayed
        if(!await ticketsItem.isDisplayed())
        {
            assert.fail('Ticket number {i} is not displayed'.replace('{i}', i));
        }
       
    }

});

//And 1
Then (/^I can see bigger ticket icon only when focus snippet$/, async () => {
    
    //get Array of snippets
    const snippetsArr = await PageObjects.snipetsArray;

    snippetsArr.splice(0,1);

    //Big ticket button
    let ticketsBigArr = await Command.smthArray(snippetsArr, PageObjects.getBigTicket);

    for (let i = 0; i < ticketsBigArr.length-1; i++)
    {
        //tmp ticket part
        let ticketsBigItem = await ticketsBigArr[i];

        //check if icon is not displayed untill focused
        if(await ticketsBigItem.isDisplayed())
        {
            assert.fail('Ticket number {i} is displayed before focused'.replace('{i}', i));
        }

        if (!await ticketsBigItem.isDisplayedInViewport())
        {
            const carousel = await PageObjects.todayCarousel; 

            let arrow = await PageObjects.getArrowRight(carousel);

            await arrow.click();
        }

        //wait for display
        await snippetsArr[i].waitForClickable({timeout: 1000});

        //focusing item
        await ticketsBigItem.moveTo();

        if(!await ticketsBigItem.waitForDisplayed(100))
        {
            assert.fail('Ticket number {i} is not displayed after focus'.replace('{i}', i));
        }
       
        //check if text is right
        assert.strictEqual(await ticketsBigItem.getText(), 'Билеты');

    }    

});

//And 2
Then (/^I can click on ticket icon$/, async () => {
 

});