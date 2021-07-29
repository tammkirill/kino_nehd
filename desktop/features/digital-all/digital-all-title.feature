Feature: Digital releases title

  Scenario Outline: When I scrolled all page to the bottom I should see all snippet

    Given I am on the <comming> page
    When I scrolled all page to the bottom
    Then I should see all snippet

    Examples:
    | comming                  |
    | comingsoon/digital/      |