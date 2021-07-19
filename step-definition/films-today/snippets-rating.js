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

Then (/^I can see rigth rating of the film$/, async () => {
    
    //get Array of snippets
    const snippetsArr = await PageObjects.snipetsArray;

    snippetsArr.splice(0,1);

    let linkArr = await Command.smthArray(snippetsArr, PageObjects.getChildA);

    let ratingArr = await Command.smthArray(snippetsArr, PageObjects.getRating);


    //check all snippets links
    for (let i = 0; i < linkArr.length-1; i++)
    {
        //tmp picture part
        let ratingItem = await ratingArr[i];

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

        //bad code, there is error on the site
        if (ratingText[0] === '–' && ratingFilm === '—')
        {
            ratingFilm = '–';
        }

        assert.equal(ratingText[0], ratingFilm);

        await browser.back();
        
    }

});