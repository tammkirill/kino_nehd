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

Then (/^I can see right picture of the film$/, async () => {
    
    //get Array of snippets
    const snippetsArr = await PageObjects.snipetsArray;

    snippetsArr.splice(0,1);

    let linkArr = await Command.smthArray(snippetsArr, PageObjects.getChildA);

    let pictureArr = await Command.smthArray(snippetsArr, PageObjects.getPicture);

    //regExp for part of link
    let regExp = /^\d{1,5}x\d{1,5}$/;    

    //check all snippets links
    for (let i = 0; i < linkArr.length-1; i++)
    {
        //tmp picture part
        let pictureItem = await pictureArr[i];

        let pictureLink;
        
        if (await pictureItem.isDisplayed())
        {
            pictureLink = await pictureItem.getAttribute('src'); 
        }
        else
        {
            pictureLink = await pictureItem.getAttribute('data-src'); 

        }
   

        //cut size of the picture
        let tmpSize;
        for (let i = pictureLink.length-1; i >= 0; i--)
        {
            if (await pictureLink[i] == '/')
            {
                tmpSize = i;
                break;
            }
        }

        linkName = await pictureLink.slice(0,tmpSize+1);

        

        //tmp link part
        let linkItem = await linkArr[i];

        //go to the link of snippet
        await linkItem.click();

        const rightPoster = await SecondObjects.poster;

        const rightPicture = await SecondObjects.getPicture(rightPoster);

        let rightLink = await rightPicture.getAttribute('src');

        //Check if link have right form
        if (!await Command.compareLinks(rightLink, linkName, regExp)){
            assert.fail('Link {linkName} is incorrect'.replace('{linkName}', linkName));
        }

        await browser.back();
        
    }

});