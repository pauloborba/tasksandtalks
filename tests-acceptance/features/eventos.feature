Feature: I want to associate events to an existing task

Scenario: Importing an event of Google Calendar to an task

Given I am at events page

When I try to import the event "Monitoria  de InfraSoft" of Google Calendar to task "ESS"

Then I can see "Monitoria de InfraSoft" with task "ESS" in event list
