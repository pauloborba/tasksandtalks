Feature: As a task contributor
            I want to send a chat message to other task contributors
            So that I can discuss about the task in hand

# Scenario: Sending a chat message while logged in
# Given I am at the task context page
# Given I can see that I am logged in as "matheus"
# When I try to send the chat message "Good evening!" 
# Then I can see the chat message "Good evening!" that was sent by "matheus" in the chat thread

Scenario: Sending a chat message after informing my name while not logged in
Given I am at the task context page
Given I can see that I am not logged in
When I try to send the chat message "Good evening!" with "matheus" in the name field
Then I can see the chat message "Good evening!" that was sent by "matheus" in the chat thread

# Scenario: Sending a chat message without informing my name while not logged in
# Given I am at the task context page
# Given I can see that I am not logged in
# When I try to send the chat message "Good evening!" 
# Then I cannot see the the chat message "Good evening!" in the chat thread

# Scenario: Sending a chat message with no content while logged in
# Given I am at the task context page
# Given I can see that I am logged in as "matheus"
# When I try to send a chat message with no content
# Then I cannot see an empty message that was sent by "matheus" in the chat thread 

# Scenario: Sending a chat message with no content after informing my name while not logged in
# Given I am at the task context page
# Given I can see that I am not logged in
# When I try to send a chat message with no content with "matheus" in the name field 
# Then I cannot see an empty message that was sent by "matheus" in the chat thread 

# Scenario: Sending a chat message with no content without informing my name while not logged in
# Given I am at the task context page
# Given I can see that I am not logged in
# When I try to send a chat message with no content
# Then I cannot see an empty message in the chat thread