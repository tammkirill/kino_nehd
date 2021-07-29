Feature: Carousel of digital release, date of release

  Scenario Outline: When I'm on the comming soon page I can see right date of release

    Given I am on the <comming> page
    When I see Carousel with digital releases
    Then I should see Snippet with right date of release

    Examples:
    | comming                  |
    | comingsoon/digital/      |