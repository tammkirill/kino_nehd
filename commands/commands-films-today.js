const Page = require('./OpenPage');

const PageObjects = require('../pageobjects/films-today/pageobject');

class FilmTodayCommands extends Page 
{
    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
    */

    /** Commands that do something */
    async compareLinks(stringURL, link, regularExp)
    {
        //get string lenght 
        const needLength = await link.length;

        //get link to compare
        let stringURLstart = await stringURL.slice(0, needLength);

        //get part to compare with regular expression
        let stringURLregular = await stringURL.slice(needLength);

        //compare expected and actual addresses
        let result = (stringURLstart === link && stringURLregular.match(regularExp))? true: false;

        return result;

    }

    /** Get commands */

    //get Array of needed things
    async smthArray(snippetArr, getFunc)
    {

        let smthArr = new Array();

        for (let i = 0; i <  snippetArr.length; i++)
        {
        
            smthArr[i] =  getFunc(snippetArr[i]);

        }   

        return smthArr;
    }

    /**
     * overwrite specifc options to adapt it to page object
     */
    async open (path) 
    {
        await browser.deleteCookies();
        return super.open(path);
    }
}

module.exports = new FilmTodayCommands();