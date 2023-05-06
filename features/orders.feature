Feature: Orders Feature
  Scenario: List Orders
    When I list all "orders"
    Then I should have response "OK"
    And following "orders" list:
    | id | orderDate | recipeId | quantity | userId |
    | 375f5512-facd-4cf8-a6c6-3cc8dbf992bc | 2023-02-18 | a35ce12d-d52b-4a07-90ad-68e985b779e7 | 1 | cef5ee37-15de-4039-8d03-8ecc23d98ecc |
    | 1d2066d3-054a-4193-ac53-a1e9d028db8f | 2023-03-12 | dc466424-4297-481a-a8de-aa0898852da1 | 1 | a70f0f97-8ec0-4d66-8bfc-975357f37a1e |

  Scenario: Create an order
    When I create the following "order":
      | orderDate | recipeId | quantity | userId |
      | 2023-07-20 | dc466424-4297-481a-a8de-aa0898852da1 | 1 | 28a2c102-bbde-4f3f-84b1-a40f689e4a78 |
    Then I should have response "CREATED"
     And following new "order" item:
      | orderDate | recipeId | quantity | userId |
      | 2023-07-20 | dc466424-4297-481a-a8de-aa0898852da1 | 1 | 28a2c102-bbde-4f3f-84b1-a40f689e4a78 |

  Scenario: Create an order with unknown user
    When I create the following "order":
      | orderDate | recipeId | quantity | userId |
      | 2023-07-20 | a35ce12d-d52b-4a07-90ad-68e985b779e7 | 1 | a70f0f97-9a9z-4d66-8bfc-975357f37a1e |
    Then I should have response "NOT_FOUND"
     And following error : "Unknown user"
  
  Scenario: Create an order with unknown recipe
    When I create the following "order":
      | orderDate | recipeId | quantity | userId |
      | 2023-07-20 | a35ce12d-d52b-4a07-90ad-68e985b770o0 | 1 | a70f0f97-8ec0-4d66-8bfc-975357f37a1e |
    Then I should have response "NOT_FOUND"
     And following error : "Unknown recipe"

  Scenario: Create an order with quantity equal to 0 or less
    When I create the following "order":
      | orderDate | recipeId | quantity | userId |
      | 2023-07-20 | a35ce12d-d52b-4a07-90ad-68e985b779e7 | 0 | a70f0f97-8ec0-4d66-8bfc-975357f37a1e |
    Then I should have response "BAD_REQUEST"
     And following error : "Quantity must be 1 or more"

  Scenario: Create an order in the past
    When I create the following "order":
      | orderDate | recipeId | quantity | userId |
      | 2022-07-20 | a35ce12d-d52b-4a07-90ad-68e985b779e7 | 1 | a70f0f97-8ec0-4d66-8bfc-975357f37a1e |
    Then I should have response "BAD_REQUEST"
     And following error : "You can't create an order in the past"

  Scenario: Get order by id
    When I get the "order" having id "375f5512-facd-4cf8-a6c6-3cc8dbf992bc"
    Then I should have response "OK"
     And following "order" item:
     | id | orderDate | recipeId | quantity | userId |
     | 375f5512-facd-4cf8-a6c6-3cc8dbf992bc | 2023-02-18 | a35ce12d-d52b-4a07-90ad-68e985b779e7 | 1 | cef5ee37-15de-4039-8d03-8ecc23d98ecc |

  Scenario: Get order with bad uuid
    When I get the "order" having id "baduuid"
    Then I should have response "BAD_REQUEST"
     And following error : "L'ID renseigné n'est pas de type UUID"
  
  Scenario: Get inexistant order by id
    When I get the "order" having id "455f5512-facd-4cf8-a6c6-3cc8dbf992bc"
    Then I should have response "NOT_FOUND"
     And following error : "Order with id 455f5512-facd-4cf8-a6c6-3cc8dbf992bc not found"

  Scenario: Get orders by user
    When I get the "user" having id "cef5ee37-15de-4039-8d03-8ecc23d98ecc" in orders
    Then I should have response "OK"
     And following "orders" list:
     | id | orderDate | recipeId | quantity | userId |
     | 375f5512-facd-4cf8-a6c6-3cc8dbf992bc | 2023-02-18 | a35ce12d-d52b-4a07-90ad-68e985b779e7 | 1 | cef5ee37-15de-4039-8d03-8ecc23d98ecc |

  Scenario: Get order with unknown user
    When I get the "user" having id "2ef5ee37-15de-4039-8d03-8ecc23d98ecc" in orders
    Then I should have response "NOT_FOUND"
     And following error : "Unknown user"
  
  Scenario: Get orders by user with bad uuid
    When I get the "user" having id "baduuid" in orders
    Then I should have response "BAD_REQUEST"
     And following error : "L'ID renseigné n'est pas de type UUID"

  Scenario: Get orders with existing user owning 0 order
    When I get the "user" having id "a2e84855-be23-42fc-81ed-83e807198c9c" in orders
    Then I should have response "OK"
     And following log info : "This user owns 0 order at the moment"

   Scenario: Get orders by recipe
    When I get the "recipe" having id "a35ce12d-d52b-4a07-90ad-68e985b779e7" in orders
    Then I should have response "OK"
     And following "orders" list:
     | id | orderDate | recipeId | quantity | userId |
     | 375f5512-facd-4cf8-a6c6-3cc8dbf992bc | 2023-02-18 | a35ce12d-d52b-4a07-90ad-68e985b779e7 | 1 | cef5ee37-15de-4039-8d03-8ecc23d98ecc |

  Scenario: Get order with unknown recipe
    When I get the "recipe" having id "2ef5aa37-15de-4039-8d03-8ecc23d98ecc" in orders
    Then I should have response "NOT_FOUND"
     And following error : "Unknown recipe"
  
  Scenario: Get orders by recipe with bad uuid
    When I get the "recipe" having id "baduuid" in orders
    Then I should have response "BAD_REQUEST"
     And following error : "L'ID renseigné n'est pas de type UUID"

  Scenario: Get orders with existing recipe attached to 0 order
    When I get the "recipe" having id "cd38e196-f4fb-4a8a-a2a2-791d9df0c86c" in orders
    Then I should have response "OK"
     And following log info : "This recipe is attached to 0 order at the moment"

  Scenario: Update an order
    When I update the "order" having id "1d2066d3-054a-4193-ac53-a1e9d028db8f" with following data:
      | recipeId | quantity | userId |
      | dc466424-4297-481a-a8de-aa0898852da1 | 3 | a70f0f97-8ec0-4d66-8bfc-975357f37a1e |
    Then I should have response "OK"
     And following "order" item datas updated:
      | id | recipeId | quantity | userId |
      | 1d2066d3-054a-4193-ac53-a1e9d028db8f | dc466424-4297-481a-a8de-aa0898852da1 | 3 | a70f0f97-8ec0-4d66-8bfc-975357f37a1e |
  
  Scenario: Update an unknown order
    When I update the "order" having id "11fb5610-adf2-433d-a5eb-5f80aaa17826" with following data:
      | recipeId | quantity | userId |
      | dc466424-4297-481a-a8de-aa0898852da1 | 3 | a70f0f97-8ec0-4d66-8bfc-975357f37a1e |
    Then I should have response "NOT_FOUND"
     And following error : "Unknown order"
    
  Scenario: Update order with unknown recipe
    When I update the "order" having id "1d2066d3-054a-4193-ac53-a1e9d028db8f" with following data:
      | recipeId | quantity | userId |
      | dc466424-4297-481a-a8de-aa0898852xx1 | 3 | a70f0f97-8ec0-4d66-8bfc-975357f37a1e |
    Then I should have response "NOT_FOUND"
     And following error : "Unknown recipe"

  Scenario: Update order with unknown user
    When I update the "order" having id "1d2066d3-054a-4193-ac53-a1e9d028db8f" with following data:
      | recipeId | quantity | userId |
      | dc466424-4297-481a-a8de-aa0898852da1 | 3 | mo1z0f97-8ec0-4d66-8bfc-975357f37a1e |
    Then I should have response "NOT_FOUND"
     And following error : "Unknown user"
     
  Scenario: Update an order with bad uuid
    When I update the "order" having id "baduuid" with following data:
      | recipeId | quantity | userId |
      | dc466424-4297-481a-a8de-aa0898852da1 | 3 | a70f0f97-8ec0-4d66-8bfc-975357f37a1e |
    Then I should have response "BAD_REQUEST"
     And following error : "L'ID renseigné n'est pas de type UUID"

  Scenario: Update an order bad quantity
    When I update the "order" having id "1d2066d3-054a-4193-ac53-a1e9d028db8f" with following data:
      | recipeId | quantity | userId |
      | dc466424-4297-481a-a8de-aa0898852da1 | 0 | a70f0f97-8ec0-4d66-8bfc-975357f37a1e |
    Then I should have response "BAD_REQUEST"
     And following error : "Quantity must be 1 or more"

  Scenario: Delete an order
    When I delete the "order" having id "375f5512-facd-4cf8-a6c6-3cc8dbf992bc"
    Then I should have response "OK"
    And following deleted "order" item:
      | id | orderDate | recipeId | quantity | userId |
      | 375f5512-facd-4cf8-a6c6-3cc8dbf992bc | 2023-02-18 | a35ce12d-d52b-4a07-90ad-68e985b779e7 | 1 | cef5ee37-15de-4039-8d03-8ecc23d98ecc |

  Scenario: Delete an inexistant order
    When I delete the "order" having id "70a1e7b7-6263-4037-b322-f30bbf0a3e39"
    Then I should have response "NOT_FOUND"
    And following error : "Order with id 70a1e7b7-6263-4037-b322-f30bbf0a3e39 not found"

  Scenario: Delete an order with bad uuid
      When I delete the "order" having id "baduuid"
      Then I should have response "BAD_REQUEST"
      And following error : "L'ID renseigné n'est pas de type UUID"
  