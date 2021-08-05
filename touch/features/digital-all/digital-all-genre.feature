Feature: Digital releases genres

  Scenario Outline: When I on the digital releases page I should see right genres

    Given I am on the <comming> page
    When I scrolled all page to the bottom
    Then I should see right genres

    Examples:
    | comming                  |
    | comingsoon/digital/      |