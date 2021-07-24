Feature: Courusel of films today

  Scenario Outline: When I'm on the main page I can see Courusel of films today

    Given I am on the <main> page
    When I just wait
    Then I should see Courusel with <name>

    Examples:
      | name            | main  |
      | Смотрите в кино |       |

