//Command contained in all classes

module.exports = class Page {
  //Opens ./path
  open(path) {
    return browser.url(`https://www.kinopoisk.ru/${path}`);
  }
};
