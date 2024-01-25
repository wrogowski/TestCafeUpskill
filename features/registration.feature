Feature: Register client tests

  As a visitor I am able to craete a new account on the register page

  Scenario: New user registration
    Given I open the regstration page
    When I select the "male" option from Gender radio buttons
    And I provide the "FirstName" field with "Wlodek" value
    And I provide the "LastName" field with "Ro" value
    And I set Date of Birth to "5" "January" "1999"
    And I provide the "Email" field with "asd@asd.as" value
    And I provide the "Password" field with "pass123" value
    And I click the "Register" button
    Then registration confirmation page is opened
    And a sucess message is displayed
