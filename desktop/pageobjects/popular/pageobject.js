/**
pageobjects of Films Today
Contains:
1. buttons
2. snippets
3. links
*/

class PopularPO {
  //get header first level
  get header1() {
    return $("h1");
  }

  //get snippets array
  get snippetArr() {
    return $$('[data-tid="af76fbb3"]');
  }

  get snippetsPictures() {
    return $$('[data-tid="d813cf42"]');
  }

  get buttonForward() {
    return $('[data-tid="6e4f0353"]');
  }

  //get snippets link
  async getLink(document) {
    return document.$('[data-tid="6cf86878"]');
  }

  async getChildA(document) {
    return document.$("a");
  }

  //get film title
  async getFilmTitle(document) {
    return document.$('[class="selection-film-item-meta__name"]');
  }

  //get film title
  async getFilmEngYear(document) {
    return document.$('[class="selection-film-item-meta__original-name"]');
  }

  //get coutnry and genre of the film
  async getChildSpan(document) {
    return document.$("span");
  }

  //get Picture and Rating class
  async getPicAndRating(document) {
    return document.$('[data-tid="9b39d766"]');
  }
}

module.exports = new PopularPO();
