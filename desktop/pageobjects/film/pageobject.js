/**
pageobjects of Films Today
Contains:
1. poster
2. title
3. information about film
*/

class FilmPO {
  get poster() {
    return $('[data-tid="709cff27"]');
  }

  get filmTitle() {
    return $('[data-tid="67e47501"]');
  }

  get filmGenreArr() {
    return $('[data-tid="d61dc135"]');
  }

  //get year of the film
  get filmYear() {
    return $('[data-tid="a189db02"]');
  }

  //get film rating
  get filmRating() {
    return $('[data-tid="125104c7"]');
  }

  //get film eng name
  get engName() {
    return $$('[data-tid="3bbf3321"]');
  }

  /**Page for serial */

  //get Serial title
  get serialTitle() {
    return $('[data-tid="35f45dae"]');
  }

  //get Serial eng Name
  get serialEng() {
    return $('[data-tid="75102d8e"]');
  }

  //get Serial Year with country
  get serialYear() {
    return $('[data-tid="2d6c4e99"]');
  }

  //get Serial Genre
  get serialGenre() {
    return $('[data-tid="df943f2f"]');
  }

  //get picture of the film
  async getPicture(document) {
    return document.$('[data-tid="6fee64e1"]');
  }
}

module.exports = new FilmPO();
