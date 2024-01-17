Feature: Register client tests

  As a visitor I am able to craete a new account by the register page

  Scenario: New user registration
    Given I open the regstration page
    When I select the "male" option from "Gender" radio buttons
    And I provide the "First name" field with "Włodek" value
    And I provide the "Last name" field with "Ro" value
    And I select "5" value from "Day of Birth" dropdown
    And I select "January" value from "Month of Birth" dropdown
    And I select "1999" value from "Year of Birth" dropdown
    And I provide the "Email" field with "asd@asd.as" value
    And I provide the "Password" field with "pass123" value
    And I provide the "Confirm password" field with "pass123" value
    And I click the "Register" buttons
    Then registration confirmation page is opened
    And sucess message is displayed

