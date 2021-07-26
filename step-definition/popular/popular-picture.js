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

Then (/^I should see the right picture of the snippet$/, async () => {
    
    const snippetsArr = await PageObjects.snippetArr;

    //get array of all links
    let linksArr = await Command.smthArray(snippetsArr, PageObjects.getLink);

    //get array of all pictures
    let picturesArr = await PageObjects.snippetsPictures;

    //regExp for part of link
    let regExp = /^\d{1,5}x\d{1,5}$/;  

    //check if all pictures are right
    for (let i = 0; i < linksArr.length; i++)
    {

        let pictureItem = await picturesArr[i];

        //get link of the picture
        let pictureLink = await pictureItem.getAttribute('src'); 

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
        let linkItem = await linksArr[i];

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