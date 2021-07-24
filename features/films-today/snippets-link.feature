Feature: Snippet link

  Scenario Outline: When I'm on the main page I can click on snippet to find out more about film

    Given I am on the <main> page
    When I see Carousel with Snippets 
    Then I click on Snippet and should be on the <link>

    Examples:
    |main  | buttonName      | link                                 |
    |      | Все             | https://www.kinopoisk.ru/film/       |