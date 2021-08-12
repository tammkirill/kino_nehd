Feature: Snippets on popular page

@header1
  Scenario Outline: When I'm on the popular page, I can see header 1 is bold

    Given I am on the <popular> page
    When I see header 1
    Then I should see it with <font_weight>

    Examples:
      | popular         | font_weight  |
      | popular/films/  | 700          |

@snippets
  Scenario Outline: When I'm on the popular page, I can click on the film and get to it

    Given I am on the <popular> page
    When I can see film snippet
    Then I should be able to go to the page of this film: <link>

    Examples:
      | link                             | popular                       |
      | https://www.kinopoisk.ru/        | popular/films/                |
      | https://www.kinopoisk.ru/        | popular/films/?page=2&tab=all |
      | https://www.kinopoisk.ru/        | popular/films/?page=3&tab=all |


  Scenario Outline: When I'm on the popular page, I can see right inform about the film

    Given I am on the <popular> page
    When I can see film snippet
    Then I should see right title of the film
    And I should see right year and eng name

    Examples:
      | popular                       |
      | popular/films/                |
      | popular/films/?page=2&tab=all |
      | popular/films/?page=3&tab=all |


  Scenario Outline: When I'm on the popular page, I can see right picture of the film

    Given I am on the <popular> page
    When I can see film snippet
    Then I should see the right picture of the snippet

    Examples:
      | popular                       |
      | popular/films/                |
      | popular/films/?page=2&tab=all |
      | popular/films/?page=3&tab=all |


  Scenario Outline: When I'm on the popular page, I can see right rating of the film

    Given I am on the <popular> page
    When I can see film snippet
    Then I should see right rating of the film

    Examples:
      | popular                       |
      | popular/films/                |
      | popular/films/?page=2&tab=all |
      | popular/films/?page=3&tab=all |


