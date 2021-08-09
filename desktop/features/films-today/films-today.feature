Feature: Carousel of films today

  Background: 
    Given I am on the main page 

@carousel
  Scenario: When I'm on the main page I can click on link to see all films today

    When I see button named <buttonName> and click it
    Then I should be on the page of today's films: <link>

    Examples:
      | buttonName      | link                                 |
      | Все             | https://www.kinopoisk.ru/afisha/new/ |

@carousel
  Scenario: When I'm on the main page I can see Courusel of films today

    When I just wait
    Then I should see Carousel with <name>

    Examples:
      | name            |
      | Смотрите в кино |

@snippets
  Scenario: When I see the snippet's carousel and scrolled it to the end, I can click All films

    When I see Carousel with Snippets 
    And I scrolled to the right maximum
    Then I can click on button All Films and get to <link>

    Examples:
      | link                                           | main   |
      | https://www.kinopoisk.ru/afisha/new/city/      |        |

@snippets
  Scenario: When I see the snippet's carousel, I can click on the buttons right and left to scroll carousel

    When I see Carousel with Snippets
    Then I can click right button
    And I can click left button

    Examples:
      | main   |
      |        |

@snippets
  Scenario: When I'm on the main page I can click on snippet to find out more about film

    When I see Carousel with Snippets
    Then I click on Snippet and should be on the <link>

    Examples:
    | main  | buttonName      | link                                 |
    |       | Все             | https://www.kinopoisk.ru/film/       |

@snippets
  Scenario: When I see the snippet's carousel, I can see title, year and genre of films

    When I see Carousel with Snippets
    Then I can see right title of the film 
    And I can see right year and genre

    Examples:
      | main   |
      |        |

@snippets
  Scenario: When I see the snippet's carousel, I can see picture of films

    When I see Carousel with Snippets
    Then I can see right picture of the film 

    Examples:
      | main   |
      |        |

@snippets
  Scenario: When I see the snippet's carousel, I can see rigth rating of the film

    When I see Carousel with Snippets
    Then I can see rigth rating of the film

    Examples:
      | main   |
      |        |
      
@snippets
  Scenario: When I see the snippet's carousel, I can see icon of a ticket and click on it
 
    When I see Carousel with Snippets
    Then I can see ticket icon
    And I can see bigger ticket icon only when focus snippet
    And I can click on ticket icon and get to <link>

    Examples:
      | buttonName      | link                                 | main |
      | Все             | https://www.kinopoisk.ru/film/       |      |

