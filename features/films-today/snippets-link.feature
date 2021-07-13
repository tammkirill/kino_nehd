Feature: Snippet link

  Scenario Outline: When I'm on the main page I can click on snippet to find out more about film

    Given I am on the main page
    When I see Carousel with Snippets 
    And click it
    Then I should be on the page of today's films: <link>

    Examples:
      | buttonName      | link                                 |
      | Все             | https://www.kinopoisk.ru/afisha/new/ |