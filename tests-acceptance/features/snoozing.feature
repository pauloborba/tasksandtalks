Feature: As a user
         I want to apply snooze 
         So that I will not receive messages anymore on my chat

Scenario: Applying Snooze on a specific time
Given I'm at my chat
And I want to apply a snooze function
When I try to set a snooze date: "2020-11-26" and a snooze time "09:15"
Then I see no new messages until date: "2020-11-26" and time "09:15"
