Feature: Digital releases english name

  Scenario Outline: When I scrolled all page to the bottom I can click on snippet

    Given I am on the <comming> page
    When I scrolled all page to the bottom
    Then I should see right english name

    Examples:
    | comming                  |
    | comingsoon/digital/      |