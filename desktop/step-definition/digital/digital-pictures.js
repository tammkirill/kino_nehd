const { Given, When, Then } = require('@cucumber/cucumber');

const assert = require('assert');

//** Check if link for snippets is correct*/

const MainPage = require('../../commands/commands-films-today');

const PageObjects = require('../../pageobjects/digital/pageobject');

const Command = require('../../commands/commands-films-today');



Given (/I am on the (.+) page$/, async (comming) => {
    await MainPage.open(comming || "");
});

When (/^I see Carousel with digital realeses$/, async () => {
    
    const carouselDigital = await PageObjects.carouselDigital;

    let snippetsArr = await PageObjects.getSnippetsArray(carouselDigital);

    //check if all snippets are displayed
    for (let i = 0; i < snippetsArr.length; i++)
    {
        if (!snippetsArr[i].isDisplayed())
        {
            assert.fail('Snippet {i} is not displayed'.replace('{i}',i));
        }
    }

});

Then (/^I should see Snippet with right picture$/, async () => {
    
    const carouselDigital = await PageObjects.carouselDigital;

    let snippetsArr = await PageObjects.getSnippetsArray(carouselDigital);

    let picturesArr = await Command.smthArray(snippetsArr, PageObjects.getSnippetPicture);

    for (let i = 0; i < snippetsArr.length; i++)
    {
        //snippet Picture
        let pictureItem = await picturesArr[i];

        let pictureLink = await pictureItem.getAttribute('src');

        let pictureDigits = await Command.getLastPart(pictureLink);

        //snippet links
        let snippetsItem = await snippetsArr[i];

        await snippetsItem.scrollIntoView();

        await snippetsItem.click();

        //get link of the page where we have came
        let stringURL = await browser.getUrl();

        

        let digitsURL = await Command.getLastPart(stringURL);

        //cpmpare digits from links
        assert.strictEqual(digitsURL, pictureDigits);

        await browser.back();
    }
    
});