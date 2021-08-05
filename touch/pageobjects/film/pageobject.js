/**
pageobjects of Films Today
Contains:
1. poster
2. title
3. information about film
*/

class FilmPO {
  get filmEngTitle() {
    return $('[data-tid="17993bf6"]');
  }

  get filmYearAndGenres() {
    return $('[data-tid="85c1202a"]')
  }
}

module.exports = new FilmPO();
