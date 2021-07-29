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
  get snippetsArr() {
    return $$('[class="premier_item"]');
  }

  async getTitle(document) {
    return document.$('[class="name"]');
  }
}

module.exports = new DigitalAllPO();
