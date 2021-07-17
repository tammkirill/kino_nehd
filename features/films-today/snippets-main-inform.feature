Feature: Snippet title, year and genre

  Scenario Outline: When I see the snippet's carousel, I can see title, year and genre of films

    Given I am on the main page
    When I see Carousel with Snippets 
    Then I can see right title of the film 
    And I can see right year
    And I can see genre