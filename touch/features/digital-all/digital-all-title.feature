Feature: Digital releases link

  Scenario Outline: When I scrolled all page to the bottom I can click on snippet

    Given I am on the <comming> page
    When I scrolled all page to the bottom
    Then I can click on Snippet and should be on the <link>

    Examples:
    | comming                  | link                            |
    | comingsoon/digital/      | https://www.kinopoisk.ru/       |