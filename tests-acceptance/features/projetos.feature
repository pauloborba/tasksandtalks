Feature: As a user
         I want to register projects
         So that I can menage its attributes

Scenario: Register of new project
Given I'm at the project's page
And And I cannot see a project called "Roteiro de requisitos" in the project's list
When I try to register a project called "Roteiro de requisitos"
Then I see that the project "Roteiro de requisitos" is now on the project's list

Scenario: Register of project with an existing name
Given I'm at the project's page
And And I can see a project called "Roteiro de requisitos" in the project's list
When I try to register a new project called "Roteiro de requisitos"
Then I see an error message
And I see that there's only one project "Roteiro de requisitos"

Scenario: Delete an existing project
Given I'm at the project's page
And I can see a project called "Roteiro de testes" in the list of projects
When I try to delete a project called "Roteiro de testes"
Then I can see the project "Roteiro de testes" is no longer in the projects's list

Scenario: Archive and existing project
Given I'm at the project's page
And I can see a project called "Roteiro de requisitos" in the list of projects
And The project "Roteiro de requisitos" is not archived
When I try to archive the project "Roteiro de requisitos"
Then I see that the project "Roteiro de requisitos" was archived