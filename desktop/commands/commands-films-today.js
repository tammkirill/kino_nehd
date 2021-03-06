const assert = require("assert");

const Page = require("./OpenPage");

class FilmTodayCommands extends Page {
  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to login using username and password
   */

  /** Commands that do something */
  //Compare links with regexp
  async compareLinks(stringURL, link, regularExp) {
    //get string lenght
    const needLength = await link.length;

    //get link to compare
    let stringURLstart = await stringURL.slice(0, needLength);

    //get part to compare with regular expression
    let stringURLregular = await stringURL.slice(needLength);

    //compare expected and actual addresses
    let isSimmilar =
      stringURLstart === link && stringURLregular.match(regularExp)
        ? true
        : false;

    if (!isSimmilar) {
      return assert.fail(
        "Link {stringURL} is incorrect".replace("{stringURL}", stringURL)
      );
    } else {
      return;
    }
  }

  //Compare titles of the film
  async compareTitles(snippetStr, rightStr) {
    //Delete a year from string
    let tmpRightStr = rightStr.slice(0, rightStr.length - 7);

    let snippetName = snippetStr;

    for (let i = 0; i < snippetName.length; i++) {
      if (snippetName[i] === "\n") {
        snippetName =
        snippetName.substr(0, i) + " " + snippetName.substr(i + 1);
      }
    }

    return assert.strictEqual(tmpRightStr, snippetName);
  }

  //check if the link is a film
  async isFilmLink(stringURL) {
    let regExp = /^https:\/\/www\.kinopoisk\.ru\/film\/\d+\/$/;

    let strTMP = stringURL.match(regExp);

    let filmURL = strTMP === null ? false : true;

    return filmURL;
  }

  //get last digits from link
  async getLastPart(stringURL) {
    //if last symbol is slash, then cut it
    if (stringURL[stringURL.length - 1] === "/") {
      stringURL = stringURL.slice(0, stringURL.length - 1);
    }

    let URLarray = stringURL.split(/\//);

    //get last part of the URL
    let lastPart = URLarray[URLarray.length - 1];

    let digitsPart = lastPart.match(/\d+/);

    return digitsPart[0];
  }

  //make date type 00.00.0000 - 0 month 0000
  async getRusDate(date) {
    let dateArr = date.split(".");

    let day = dateArr[0];

    let month = dateArr[1];

    let year = dateArr[2];

    //0x -> x
    day = await this.deleteZero(day);

    month = await this.deleteZero(month);

    const monthArray = [
      "????????????",
      "??????????????",
      "??????????",
      "????????????",
      "??????",
      "????????",
      "????????",
      "??????????????",
      "????????????????",
      "??????????????",
      "????????????",
      "??????????????"
    ];

    let resultDate = day + " " + monthArray[month - 1] + " " + year;

    return resultDate;
  }

  //delete first zero
  async deleteZero(number) {
    if (number[0] === "0") {
      number = number[1];
    }

    return number;
  }

  //returns string without first year, only genres
  async splitYearMob(string) {
    let splitPos;

    for (let i = 3; i < string.length; i++) {
      if (string[i] === " " && string[i - 1] === ",") {
        splitPos = i;
        break;
      }
    }

    let strngGenres = string.slice(splitPos + 1);

    return strngGenres;
  }

  /** Get commands */

  //get Array of needed things
  async smthArray(snippetArr, getFunc) {
    let smthArr = new Array();

    for (let i = 0; i < snippetArr.length; i++) {
      smthArr[i] = getFunc(snippetArr[i]);
    }

    return smthArr;
  }

  /**
   * overwrite specifc options to adapt it to page object
   */
  async open(path) {
    await browser.deleteCookies();
    return super.open(path);
  }

  get mainLink() {
    return "";
  }

  /** Check something */

  async checkVisible(selector, viewport = false) {
    console.log('checkVisible');
    const element = await selector;

    const isViewport = await element.isDisplayedInViewport();

    const isNotViewport = await element.isDisplayed();

    const actual = viewport
      ? isViewport 
      : isNotViewport;

    return assert.strictEqual(actual, true, "Element is not visible");
  }

  async checkExistance(selector) {
    const element = await selector;

    const actual = await element.isExisting();

    return assert.strictEqual(actual, true, "Element is not exists");
  }

  async checkArray(array, getFunc) {
    console.log('checkArray');
    for (let i = 0; i < array.length; i++) {
      await getFunc(array[i]);
    }

    return;
  }

  async checkText(selector, text) {
    return assert.strictEqual(text, await selector.getText());
  }

  async clickVisible(selectorVisible, button, browser) {
    while (!await selectorVisible.isDisplayedInViewport()) {
      //clicks are too fast
      await browser.pause(700);

      await button.click();
    }

    return;
  }

  async checkArrowsWork(arrowButton, selectorArr, startCheck, endCheck) {
    //click right button
    await arrowButton.click();

    //check if new snippets are displayed
    for (let i = startCheck; i < endCheck; i++) {
      await selectorArr[i].waitForClickable({
        timeout: 3000,
        timeoutMsg: "New selectors are not displayed"
      });
    }

    return;
  }

  async checkSnippetLinks(linkArr, linkName, regExp, browser) {
    for (let i = 0; i < linkArr.length - 1; i++) {
      let linkItem = await linkArr[i];

      await linkItem.click();

      let stringURL = await browser.getUrl();

      //Check if link have right form
      await this.compareLinks(stringURL, linkName, regExp);

      await browser.back();
    }
  }

  async checkFilmTitle(linkArr, titleArr, rightName, browser) {
    for (let i = 0; i < linkArr.length - 1; i++) {
      let titleItem = await titleArr[i];

      let titleFilm = await titleItem.getText();

      let linkItem = await linkArr[i];

      await linkItem.click();

      let nameText = await rightName.getText();

      //Check if titles are equal
      await this.compareTitles(titleFilm, nameText);

      await browser.back();
    }
  }

  async checkFilmGenre(linkArr, genreArr, rightYear, rightGenre, browser) {
    for (let i = 0; i < linkArr.length - 1; i++) {
      let genreItem = await genreArr[i];
  
      let genreFilm = await genreItem.getText();
  
      genreFilm = genreFilm.split(", ");
  
      let linkItem = await linkArr[i];
  
      await linkItem.click();
  
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
  }

  async checkPoster(linkArr, pictureArr, rightPoster, regExp, browser, getPicture) {
    for (let i = 0; i < linkArr.length - 1; i++) {
      let pictureItem = await pictureArr[i];
  
      let pictureLink;
  
      if (await pictureItem.isDisplayed()) {
        pictureLink = await pictureItem.getAttribute("src");
      } else {
        pictureLink = await pictureItem.getAttribute("data-src");
      }
  
      let tmpSize;
  
      for (let i = pictureLink.length - 1; i >= 0; i--) {
        if ((await pictureLink[i]) === "/") {
          tmpSize = i;
          break;
        }
      }
  
      let linkName = await pictureLink.slice(0, tmpSize + 1);
  
      let linkItem = await linkArr[i];
  
      await linkItem.click();

      const rightPicture = await getPicture(rightPoster);
  
      let rightLink = await rightPicture.getAttribute("src");
  
      //Check if link have right form
      await this.compareLinks(rightLink, linkName, regExp)
  
      await browser.back();
    }
  }

  async checkRating(linkArr, ratingArr, rightRating, browser) {
    for (let i = 0; i < linkArr.length - 1; i++) {
      let ratingItem = await ratingArr[i];
  
      let ratingFilm = await ratingItem.getText();
  
      let linkItem = await linkArr[i];
  
      await linkItem.click();
  
      let ratingText = await rightRating.getText();
  
      //get strictly number of rating
      ratingText = ratingText.split(/\s/);
  
      //trick: there is error on the site
      if (ratingText[0] === "???" && ratingFilm === "???") {
        ratingFilm = "???";
      }
  
      assert.strictEqual(ratingText[0], ratingFilm);
  
      await browser.back();
    }
  }

  async checkBigTicket(snippetsArr, ticketsBigArr, text) {
    for (let i = 0; i < ticketsBigArr.length - 1; i++) {
      let ticketsBigItem = await ticketsBigArr[i];
  
      this.checkVisible(ticketsBigItem);
  
      await snippetsArr[i].waitForClickable({ timeout: 1000 });
  
      //focusing item
      await ticketsBigItem.moveTo();
  
      //Wait to be displayed after focus
      await this.checkVisible(ticketsBigItem, true);
  
      await this.checkText(ticketsBigItem, text);
    }
  }
}

module.exports = new FilmTodayCommands();
