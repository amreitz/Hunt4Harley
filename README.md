# Hunt4Harley
An exploratory Javascript 2D game.


This is a 2D top-down (or perhaps isometric - hasn't been confirmed yet) Javascript game I want to develop that follows the adventures of a cat
as they search for the lost friend, Harley.

### Engine Features for MVP
---
- Player
  - Walking around the screen
  - Responsiveness to keys 
  - Interactions with elements on the screen
    - Handling of boundaries/no-go zones
    - Handling of interaction with characters
    - Handling of interaction with items
- Maps
  - Map generation and display
  - Map updating engine (not on every refresh unless player is moving)
  - Population of environmental elements
  - Population of NPC/characters and important interactive items
  - Intro fade screen
- Milestones (Story)
  - Cutscenes when important items are interacted with
  - Fades between maps/levels
- Characters
  - Animations for characters
  - Movement and population in map
- Engine
  - Main game loop (update -> render -> repeat)
  - Keystoke listeners
  - Building layer canvas elements
- Mobile responsiveness
  - Screen size adjustments
  - Handling of Retina displays
  
