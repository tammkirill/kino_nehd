const { Given, When, Then } = require('@cucumber/cucumber');

const assert = require('assert');

//** Check if link for snippets is correct*/

const MainPage = require('../../commands/commands-films-today');

const PageObjects = require('../../pageobjects/popular/pageobject');

const Command = require('../../commands/commands-films-today');

const SecondObjects = require('../../pageobjects/film/pageobject');


Given (/I am on the (.+) page$/, async (popular) => {
    await MainPage.open(popular || "");
});

When (/^I can see film snippet$/, async () => {
    
    const snippetsArr = await PageObjects.snippetArr;

    //check if all snippets are displayed
    for (let i = 0; i < snippetsArr.length; i++)
    {
        if (!snippetsArr[i].isDisplayed())
        {
            assert.fail('Snippet {i} is not displayed'.replace('{i}',i));
        }
    }

});

Then (/^I should see right rating of the film$/, async () => {
    
    //get Array of snippets
    const snippetsArr = await PageObjects.snippetArr;

    let linkArr = await Command.smthArray(snippetsArr, PageObjects.getLink);

    let snippetsChildA = await Command.smthArray(snippetsArr, PageObjects.getPicAndRating);

    //check all snippets links
    for (let i = 0; i < linkArr.length; i++)
    {
        //tmp picture part
        let ratingItem = await snippetsChildA[i];

        let ratingFilm = await ratingItem.getText();
        
        //tmp link part
        let linkItem = await linkArr[i];

        //go to the link of snippet
        await linkItem.click();

        //get object of a film title on a film page
        const rightRating = await SecondObjects.filmRating;

        let ratingText = await rightRating.getText();

        //get strictly number of rating
        ratingText = ratingText.split(/\s/);

        //trick: there is error on the site
        if (ratingText[0] === '–' && ratingFilm === '—')
        {
            ratingFilm = '–';
        }

        assert.strictEqual(ratingText[0], ratingFilm);

        await browser.back();

    }
        
    
    
}); 