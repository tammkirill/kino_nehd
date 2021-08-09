Feature: Carousel of films today

  Background:
    Given I am on the main page


  Scenario: When I see the snippet's carousel and scrolled it to the end, I can click All films

    When I see Carousel with Snippets 
    And I scrolled to the right maximum
    Then I can click on button All Films and get to <link>

    Examples:
      | link                                           | main   |
      | https://www.kinopoisk.ru/afisha/new/city/      |        |


  Scenario: When I see the snippet's carousel, I can click on the buttons right and left to scroll carousel

    When I see Carousel with Snippets
    Then I can click right button
    And I can click left button

    Examples:
      | main   |
      |        |


  Scenario: When I'm on the main page I can click on snippet to find out more about film

    When I see Carousel with Snippets
    Then I click on Snippet and should be on the <link>

    Examples:
    | main  | buttonName      | link                                 |
    |       | Все             | https://www.kinopoisk.ru/film/       |


  Scenario: When I see the snippet's carousel, I can see title, year and genre of films

    When I see Carousel with Snippets
    Then I can see right title of the film 
    And I can see right year and genre

    Examples:
      | main   |
      |        |


  Scenario: When I see the snippet's carousel, I can see picture of films

    When I see Carousel with Snippets
    Then I can see right picture of the film 

    Examples:
      | main   |
      |        |


  Scenario: When I see the snippet's carousel, I can see rigth rating of the film

    When I see Carousel with Snippets
    Then I can see rigth rating of the film

    Examples:
      | main   |
      |        |

  Scenario: When I see the snippet's carousel, I can see icon of a ticket and click on it
 
    When I see Carousel with Snippets
    Then I can see ticket icon
    And I can see bigger ticket icon only when focus snippet
    And I can click on ticket icon and get to <link>

    Examples:
      | buttonName      | link                                 | main |
      | Все             | https://www.kinopoisk.ru/film/       |      |

