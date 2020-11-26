Feature: As a user
         I want to view the overwhelm level
         So that I can manage my projects

Scenario: Sorting projects by overwhelm level
Given I am at the projects page
And I can see the projects "Aprender francês" with overwhelm level "15", "Aprender Angular.js" with overwhelm level "10", "Projeto de Infracom - 2020" with overwhelm level "20"
When I select the option sort projects in descending order
Then I can see that the project order is indeed "Projeto de Infracom - 2020",  "Aprender francês", "Aprender Angular.js"