Feature: Snippet picture

  Scenario Outline: When I'm on the main page, I can see picture of the film 

    Given I am on the main page
    When I see Carousel with Snippets 
    Then I can see the right picture of the film 