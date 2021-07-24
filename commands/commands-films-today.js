const Page = require('./OpenPage');

class FilmTodayCommands extends Page 
{
    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
    */

    /** Commands that do something */
    //Compare links with regexp
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

    //Compare titles of the film
    async compareTitles(snippetStr, rightStr)
    {
        //Delete a year from string
        let tmpRightStr = rightStr.slice(0, rightStr.length - 6);

        //Delete all special symbols
        let tmpStr = snippetStr//.replace(/[^a-zа-яё0-9\s]/gi, ' ');

        return tmpRightStr === tmpStr;

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