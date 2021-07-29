Feature: Carousel of digital releases picture

  Scenario Outline: When I'm on the comming soon page I can see the right picture of the film

    Given I am on the <comming> page
    When I see Carousel with digital releases
    Then I should see Snippet with right picture

    Examples:
    | comming                  |
    | comingsoon/digital/      |