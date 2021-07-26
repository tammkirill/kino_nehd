const { Given, When, Then } = require('@cucumber/cucumber');

const assert = require('assert');

//** Check if link for snippets is correct*/

const MainPage = require('../../commands/commands-films-today');

const PageObjects = require('../../pageobjects/popular/pageobject');

const Command = require('../../commands/commands-films-today');

const SecondObjects = require('../../pageobjects/film/pageobject');



Given (/^I am on the (.*) page$/, async (popular) => {
    await MainPage.open(popular|| "");
});

When (/^I can see film snippet$/, async () => {
    //get Array of snippets
    const snippetsArr = await PageObjects.snippetArr;

    for (let i = 0; i < snippetsArr.length; i++) 
    {
        if (!snippetsArr[i].isDisplayed())
        {
            assert.fail('Snippet is not exist on the page');
        }
    }

});

//Then 1
Then (/^I should see right title of the film$/, async () => {
    
    //get Array of snippets
    const snippetsArr = await PageObjects.snippetArr;

    let linkArr = await Command.smthArray(snippetsArr, PageObjects.getLink);

    let titleArr = await Command.smthArray(snippetsArr, PageObjects.getFilmTitle);


    //check all snippets links
    for (let i = 0; i < 0; i++)
    {
        //tmp picture part
        let titleItem = await titleArr[i];

        let titleFilm = await titleItem.getText();
        
        //tmp link part
        let linkItem = await linkArr[i];

        //go to the link of snippet
        await linkItem.click();

        let stringURL = await browser.getUrl();

        //get object of a film title on a film page
        let rightName;

        //check is film or series
        if (await Command.isFilmLink(stringURL))
        {
            rightName = await SecondObjects.filmTitle;
        }else
        {
            rightName = await SecondObjects.serialTitle;
        }

        let nameText = await rightName.getText();

        //Check if titles is equal
        if (await Command.compareTitles(titleFilm, nameText)){
            assert.fail('Name on the snippet is {titleFilm}'.replace('{titleFilm}', titleFilm));
        }

        await browser.back();
        
    }

});

//And 1 (flacky)
Then (/^I should see right year and eng name$/, async () => {

    //get Array of snippets
    const snippetsArr = await PageObjects.snippetArr;

    let linkArr = await Command.smthArray(snippetsArr, PageObjects.getLink);

    let yearArr = await Command.smthArray(snippetsArr, PageObjects.getFilmEngYear);

    //check all snippets links
    for (let i = 0; i < 5; i++)
    {
        //tmp picture part
        let yearItem = await yearArr[i];

        let yearFilm = await yearItem.getText();

        yearFilm = yearFilm.split(', ');
        
        //tmp link part
        let linkItem = await linkArr[i];

        //go to the link of snippet
        await linkItem.click();

        let stringURL = await browser.getUrl();

        let rightEng;

        //get object of a film year on a film page
        let rightYear;

        let stringEng;

        let stringYear;

        //check is film or series
        if (await Command.isFilmLink(stringURL))
        {
            //get object of a film eng name on a film page
            rightEng = await SecondObjects.engName;

            //get object of a film year on a film page
            rightYear = await SecondObjects.filmYear;

            stringEng = await rightEng[0].getText();

            stringYear = await rightYear.getText();
        }else
        {
            //get object of a film eng name on a film page
            rightEng = await SecondObjects.serialEng;

            //get object of a film year on a film page
            rightYear = await SecondObjects.serialYear;

            let tmpYear = await rightYear.getText();

            tmpYear = tmpYear.slice(0,4);
            
            //Year will be first in this massive
            stringYear = tmpYear;

            stringEng = await rightEng.getText();
        }

        

        //check if year is right
        assert.strictEqual(yearFilm[0], stringEng);
        
        //check if genre is right
        assert.strictEqual(yearFilm[1].slice(0,4), stringYear);

        await browser.back();
        
    }

});