Feature: Main inform for popular films

  Scenario Outline: When I'm on the popular page, I can see right inform about the film

    Given I am on the <popular> page
    When I can see film snippet
    Then I should see right title of the film
    And I should see right year and eng name

    Examples:
      | popular                       |
      | popular/films/                |
      | popular/films/?page=2&tab=all |
      | popular/films/?page=3&tab=all |