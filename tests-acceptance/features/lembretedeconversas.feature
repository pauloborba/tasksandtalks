Feature: As a user
         I want to set a reminder of emails
         So that I can mantain my calendar planning

Scenario: User adding Reminder with valid date
Given I am looking at a context with an emailthread option
Given I am looking at an emailthread
When I try to create a valid reminder with date '27/11/2020'
Then I see an alert of a successful reminder

Scenario: User adding Reminder with an invalid date
Given I am looking at a context with an emailthread option
Given I am looking at an emailthread
When I try to create an invalid reminder with date '20/11/2020'
Then I see an alert of an unsuccessful reminder

Scenario: User adding Reminder with valid date in email with an already existing Reminder
Given I am looking at a context with an emailthread option
Given I am looking at an emailthread
Given I can see that an email of this thread has a reminder
When I try to create a valid reminder with date '27/11/2020'
Then I see an alert of a successful reminder