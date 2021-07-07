const OpenPage = require('./OpenPage');

class FilmTodayCommands extends OpenPage 
{
    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
    */
    async login (username, password) {
        await (await this.inputUsername).setValue(username);
        await (await this.inputPassword).setValue(password);
        await (await this.btnSubmit).click();
    }

    async checkStealth() {
        await (await this.checkBox).click();
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