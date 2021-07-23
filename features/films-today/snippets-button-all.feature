Feature: Snippet button

  Scenario Outline: When I see the snippet's carousel and scrolled it to the end, I can click All films

    Given I am on the main page
    When I see Carousel with Snippets 
    And I scrolled to the right maximum
    Then I can click on button All Films and get to <link>

    Examples:
      | link                                           |
      | https://www.kinopoisk.ru/afisha/new/city/      |