/**
pageobjects of Films Today
Contains:
1. pictures
2. snippets
*/

/**
 * Always asking for arrays to avoid dinamic issues (if array is > 1 than tests need to be refactored)
 */

class DigitalAllPO {
  get containerArr() {
    return $$('[data-tid="ae9d091d"]');
  }

  get snippetsArr() {
    return $$('[class="movie-snippet movie-snippet_link"]');
  }

  get gnegPopupClose() {
    return $('[class="eJXgiU"]');
  }

  async getTitle(document) {
    return document.$('[class="name"]');
  }
}

module.exports = new DigitalAllPO();
