Feature: Shopping cart for the unregistered user

  As an unregistered user, I want to add a product to the cart,
  reivew it, and be able to purchase it without account creation.

  Acceptance Criteria:
  - [x] The user can add a product to the cart
  - [x] The user can review the product
  - [ ] The user can purchase the product
  - [ ] The user is not obligated to create an accout to finalize the transaction

  Background: Open the main page
    Given I am on the main page

  Scenario: Add a product with minimum quantity to the cart
    When I click "Add to cart" button for "macBook" product
    Then I see "macBook" product details page
    And I see the minimum product available quantity set to 2
    And I click the "ADD TO CART" button
    And I see 2 elements added to the cart

  Scenario: Add different products and review the cart details
    When I add "macBook" to the cart
    And I am on the main page
    And I add "htcOne" to the cart
    And I open shopping cart details page using success bar link
    Then I see "macBook" product row in the shopping cart
    And I see "htcOne" product row in the shopping cart
