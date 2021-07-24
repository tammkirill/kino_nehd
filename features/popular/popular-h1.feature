Feature: Header 1 is bold

  Scenario Outline: When I'm on the popular page, I can see header 1 is bold

    Given I am on the <popular> page
    When I see header 1
    Then I should see it with <font-weight>

    Examples:
      | popular         | font-weight  |
      | popular/films/  | 700          |