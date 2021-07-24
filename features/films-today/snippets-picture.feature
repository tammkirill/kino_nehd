Feature: Snippet picture

  Scenario Outline: When I see the snippet's carousel, I can see picture of films

    Given I am on the <main> page
    When I see Carousel with Snippets 
    Then I can see right picture of the film 

    Examples:
      | main   |
      |        |