Feature: Carousel of films today link

  Scenario Outline: When I'm on the main page I can click on link to see all films today

    Given I am on the <main> page
    When I see button named <buttonName> and click it
    Then I should be on the page of today's films: <link>

    Examples:
      | buttonName      | link                                 | main   |
      | Все             | https://www.kinopoisk.ru/afisha/new/ |        |