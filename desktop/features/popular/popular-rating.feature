Feature: Genre for popular films

  Scenario Outline: When I'm on the popular page, I can see right rating of the film

    Given I am on the <popular> page
    When I can see film snippet
    Then I should see right rating of the film

    Examples:
      | popular                       |
      | popular/films/                |
      | popular/films/?page=2&tab=all |
      | popular/films/?page=3&tab=all |