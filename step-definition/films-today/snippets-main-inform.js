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

Then (/^I can see right title of the film$/, async () => {
    
    //get Array of snippets
    const snippetsArr = await PageObjects.snipetsArray;

    snippetsArr.splice(0,1);

    let linkArr = await Command.smthArray(snippetsArr, PageObjects.getChildA);

    let titleArr = await Command.smthArray(snippetsArr, PageObjects.getName);


    //check all snippets links
    for (let i = 35; i < linkArr.length-1; i++)
    {
        //tmp picture part
        let titleItem = await titleArr[i];

        let titleFilm = await titleItem.getText();
        
        //tmp link part
        let linkItem = await linkArr[i];

        //go to the link of snippet
        await linkItem.click();

        //get object of a film title on a film page
        const rightName = await SecondObjects.filmTitle;

        let nameText = await rightName.getText();

        //Check if titles is equal
        if (await Command.compareTitles(titleFilm, nameText)){
            assert.fail('Name on the snippet is {titleFilm}'.replace('{titleFilm}', titleFilm));
        }

        await browser.back();
        
    }

});

//flaky test
Then (/^I can see right year and genre$/, async () => {

    //get Array of snippets
    const snippetsArr = await PageObjects.snipetsArray;

    snippetsArr.splice(0,1);

    let linkArr = await Command.smthArray(snippetsArr, PageObjects.getChildA);

    let genreArr = await Command.smthArray(snippetsArr, PageObjects.getYearGenre);

    //check all snippets links
    for (let i = 0; i < linkArr.length-1; i++)
    {
        //tmp picture part
        let genreItem = await genreArr[i];

        let genreFilm = await genreItem.getText();

        genreFilm = genreFilm.split(', ');
        
        //tmp link part
        let linkItem = await linkArr[i];

        //go to the link of snippet
        await linkItem.click();

        //get object of a film genre on a film page
        const rightGenre = await SecondObjects.filmGenreArr;

        //get object of a film year on a film page
        const rightYear = await SecondObjects.filmYear;

        let stringGenre = await rightGenre.getText();

        //split all genres in the line
        stringGenre = await stringGenre.split(/(,\s)|\n/);

        let stringYear = await rightYear.getText();

        //check if year is right
        assert.strictEqual(genreFilm[0], stringYear);
        
        //check if genre is right
        assert.strictEqual(genreFilm[1], stringGenre[0]);

        await browser.back();
        
    }

});