Feature: Snippet button

  Scenario Outline: When I see the snippet's carousel, I can click on the buttons right and left to scroll carousel

    Given I am on the main page
    When I see Carousel with Snippets 
    Then I can click right button
    And I can click left button 
    