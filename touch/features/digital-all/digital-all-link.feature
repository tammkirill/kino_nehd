Feature: Digital releases link

  Scenario Outline: When I scrolled all page to the bottom I can click on snippet

    Given I am on the <comming> page
    When All snippets are clickable
    Then I can click on Snippet and should be on the <link>

    Examples:
    | comming                  | link                            |
    | comingsoon/digital/      | https://www.kinopoisk.ru/       |