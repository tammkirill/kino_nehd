/**
pageobjects of Films Today
Contains:
1. buttons
2. snippets
3. links
4. pictures
*/

/**
 * Always asking for arrays to avoid dinamic issues (if array is > 1 than tests need to be refactored)
 */

class DigitalPO {
  get carouselDigital() {
    return $('[class="premierScroll"]');
  }

  async getSnippetsArray(document) {
    return document.$$('[class="item"]');
  }

  //get picture of the snippet
  async getSnippetPicture(document) {
    return document.$("img");
  }
}

module.exports = new DigitalPO();
