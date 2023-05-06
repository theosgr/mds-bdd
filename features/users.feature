Feature: Users Feature
  Scenario: List Users
    When I list all "users"
    Then I should have response "OK"
    And following "users" list:
    
    | id | lastName | firstName | birthDate | address | phone | email |
    | cef5ee37-15de-4039-8d03-8ecc23d98ecc | Grollier | Theo | 1999-11-09 | 15 rue de la Grande Motte | 0981234321 | test@mail.com |
    | a70f0f97-8ec0-4d66-8bfc-975357f37a1e | Dujardin | Jean | 1981-01-25 | 15 rue de la Petite Motte | 0921234321 | testj@mail.com |
    | a2e84855-be23-42fc-81ed-83e807198c9c | Henry | Thierry | 1983-01-29 | 19 boulevard des Anciens | 0712382910 | lemail@mail.com |

  Scenario: Get user
    When I get the "user" having id "cef5ee37-15de-4039-8d03-8ecc23d98ecc"
    Then I should have response "OK"
     And following "user" item:
      | id | lastName | firstName | birthDate | address | phone | email |
      | cef5ee37-15de-4039-8d03-8ecc23d98ecc | Grollier | Theo | 1999-11-09 | 15 rue de la Grande Motte | 0981234321 | test@mail.com |

  Scenario: Get an inexistant user
      When I get the "user" having id "f2514f8b-2c0e-47d5-bfe6-34ef89bab6dc"
      Then I should have response "NOT_FOUND"
      And following error : "User with id f2514f8b-2c0e-47d5-bfe6-34ef89bab6dc not found"

  Scenario: Trying to get user with bad format UUID 
    When I get the "user" having id "baduuid"
    Then I should have response "BAD_REQUEST"
     And following error : "L'ID renseigné n'est pas de type UUID"

  Scenario: Create a user
    When I create the following "user":
      | lastName | firstName | birthDate | address | phone | email |
      | Diot | Jeremy | 1991-08-29 | 18 Boulevard Albert Einstein | 0652428451 | diot.jeremy@gmail.com |
    Then I should have response "CREATED"
    And following new "user" item:
      | lastName | firstName | birthDate | address | phone | email |
      | Diot | Jeremy | 1991-08-29 | 18 Boulevard Albert Einstein | 0652428451 | diot.jeremy@gmail.com |


  Scenario: Update user
    When I update the "user" having id "a2e84855-be23-42fc-81ed-83e807198c9c" with following data:
       | lastName | firstName | birthDate | address | phone | email |
       | Henry | Thierry | 1983-01-29 | 19 boulevard des Anciens | 0712382910 | lemaildethierry@mail.com |
    Then I should have response "OK"
     And following "user" item:
       |                                   id | lastName | firstName | birthDate | address | phone | email |
       |  a2e84855-be23-42fc-81ed-83e807198c9c | Henry | Thierry | 1983-01-29 | 19 boulevard des Anciens | 0712382910 | lemaildethierry@mail.com |

    Scenario: Update an inexistant user
      When I update the "user" having id "340e6ab1-31ff-421a-bf5f-f8280db3b754" with following data:
       | lastName | firstName | birthDate | address | phone | email |
       | Henry | Thierry | 1983-01-29 | 19 boulevard des Anciens | 0712382910 | lemaildethierry@mail.com |
      Then I should have response "NOT_FOUND"
      And following error : "User with id 340e6ab1-31ff-421a-bf5f-f8280db3b754 not found"  

    Scenario: Update a user with bad uuid
      When I update the "user" having id "baduuid" with following data:
       | lastName | firstName | birthDate | address | phone | email |
       | Henry | Thierry | 1983-01-29 | 19 boulevard des Anciens | 0712382910 | lemaildethierry@mail.com |
      Then I should have response "BAD_REQUEST"
      And following error : "L'ID renseigné n'est pas de type UUID"

    Scenario: Delete a user
      When I delete the "user" having id "a70f0f97-8ec0-4d66-8bfc-975357f37a1e"
      Then I should have response "OK"
      And following deleted "user" item:
      | id | lastName | firstName | birthDate | address | phone | email |
      | a70f0f97-8ec0-4d66-8bfc-975357f37a1e | Dujardin | Jean | 1981-01-25 | 15 rue de la Petite Motte | 0921234321 | testj@mail.com |
      
    Scenario: Delete an inexistant user
      When I delete the "user" having id "340e6ab1-31ff-421a-bf5f-f8280db3b754"
      Then I should have response "NOT_FOUND"
      And following error : "User with id 340e6ab1-31ff-421a-bf5f-f8280db3b754 not found"

    Scenario: Delete a user with bad uuid
      When I delete the "user" having id "baduuid"
      Then I should have response "BAD_REQUEST"
      And following error : "L'ID renseigné n'est pas de type UUID"