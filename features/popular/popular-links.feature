Feature: Links for popular films

  Scenario Outline: When I'm on the popular page, I can click on the film and get to it

    Given I am on the <popular> page
    When I can see film snippet
    Then I should be able to go to the page of this film: <link>

    Examples:
      | link                             | popular                       |
      | https://www.kinopoisk.ru/        | popular/films/                |
      | https://www.kinopoisk.ru/        | popular/films/?page=2&tab=all |
      | https://www.kinopoisk.ru/        | popular/films/?page=3&tab=all |