const { Given, When, Then } = require('@cucumber/cucumber');

const assert = require('assert');

//** Check if link for snippets is correct*/

const MainPage = require('../../commands/commands-films-today');

const PageObjects = require('../../pageobjects/films-today/pageobject');

const Command = require('../../commands/commands-films-today')

Given (/^I am on the main page$/, async () => {
    await MainPage.open("");
});

When (/^I see Carousel with Snippets$/, async () => {
    //get Array of snippets
    const snippetsArr = await PageObjects.snipetsArray;

    for (let i = 0; i <= snippetsArr.length; i++) 
    {
        if (!snippetsArr[i].isExisting())
        {
            assert.fail('Snippet is not exist on the page');
        }
    }

});

Then (/^I should be on the page of today's films: (.+)$/, async (linkName) => {
    
    //get Array of snippets
    const snippetsArr = await PageObjects.snipetsArray;

    //regExp for part of link
    let regExp = /^\d+$/;

    for (let i = 0; i <= snippetsArr.length; i++)
    {
        
    }

    //check link
    if (!await Command.compareLinks(stringURL, linkName, regExp)){
        assert.fail('Link {stringURL} is incorrect'.replace('{stringURL}', stringURL));
    }
    
}); 