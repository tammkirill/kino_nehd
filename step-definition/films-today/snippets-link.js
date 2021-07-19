const { Given, When, Then } = require('@cucumber/cucumber');

const assert = require('assert');

//** Check if link for snippets is correct*/

const MainPage = require('../../commands/commands-films-today');

const PageObjects = require('../../pageobjects/films-today/pageobject');

const Command = require('../../commands/commands-films-today');


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

Then (/^I click on Snippet and should be on the (.+)$/, async (linkName) => {
    
    //get Array of snippets
    const snippetsArr = await PageObjects.snipetsArray;

    snippetsArr.splice(0,1);

    let linkArr = await Command.smthArray(snippetsArr, PageObjects.getChildA);

    //regExp for part of link
    let regExp = /^\d+\/$/;    

    

    //check all snippets links
    for (let i = 0; i < await linkArr.length-1; i++)
    {
        
        let linkItem = await linkArr[i];

        //go to the link of snippet
        await linkItem.click();

        stringURL = await browser.getUrl();

        //Check if link have right form
        if (!await Command.compareLinks(stringURL, linkName, regExp)){
            assert.fail('Link {stringURL} is incorrect'.replace('{stringURL}', stringURL));
        }

        await browser.back();
        
    }

    //check link
    
    
}); 