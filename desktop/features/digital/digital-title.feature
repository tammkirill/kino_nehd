Feature: Carousel of digital releases title

  Scenario Outline: When I'm on the comming soon page I can see the right title of the film

    Given I am on the <comming> page
    When I see Carousel with digital releases
    Then I should see Snippet with right title

    Examples:
    | comming                  |
    | comingsoon/digital/      |