Feature: Pictures for popular films

  Scenario Outline: When I'm on the popular page, I can see right picture of the film

    Given I am on the <popular> page
    When I can see film snippet
    Then I should see the right picture of the snippet

    Examples:
      | popular                       |
      | popular/films/                |
      | popular/films/?page=2&tab=all |
      | popular/films/?page=3&tab=all |