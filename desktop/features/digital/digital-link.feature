Feature: Carousel of digital releases link

  Scenario Outline: When I'm on the comming soon page I can click on snippet to go to the page of the film

    Given I am on the <comming> page
    When I see Carousel with digital releases
    Then I can click on Snippet and should be on the <link>

    Examples:
    | comming                  | link                                 |
    | comingsoon/digital/      | https://www.kinopoisk.ru/film/       |