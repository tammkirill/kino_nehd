Feature: Snippet ticket

  Scenario Outline: When I see the snippet's carousel, I can see icon of a ticket and click on it

    Given I am on the main page
    When I see Carousel with Snippets 
    Then I can see ticket icon
    And I can see bigger ticket icon only when focus snippet
    And I can click on ticket icon and get to <link>

    Examples:
      | buttonName      | link                                 |
      | Все             | https://www.kinopoisk.ru/film/       |