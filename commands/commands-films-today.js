const Page = require('./OpenPage');

class FilmTodayCommands extends Page 
{
    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
    */
    async compareLinks(stringURL, link, regularExp)
    {
        //get string lenght 
        const needLength = await link.length;

        //get link to compare
        let stringURLstart = await stringURL.slice(0, needLength);
        
        console.log(stringURLstart);

        //get part to compare with regular expression
        let stringURLregular = await stringURL.slice(needLength);

        console.log(stringURLregular);

        //compare expected and actual addresses
        let result = (stringURLstart === link && stringURLregular.match(regularExp))? true: false;

        return result;

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