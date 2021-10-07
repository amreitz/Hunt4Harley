# Hunt for Harley
An exploratory Javascript 2D game.

See a live preview on github pages: https://amreitz.github.io/Hunt4Harley/

This is a 2D top-down (or perhaps isometric - haven't decided yet) Javascript game I want to develop that follows the adventures of a cat
as they search for the lost friend, Harley. Primarily an RPG, it features some puzzle and interactive elements that require the player interact
with the world in a more sophisticated manner.

### Targeted features for first round
---
- Player
  - [x] Walking around the screen
  - [x] Responsiveness to keys 
  - [x] Responsive animated sprites
  - [x] Interactions with elements on the screen
    - [x] Handling of boundaries/no-go zones
    - [x] Handling of interaction with characters / items
- Maps
  - [x] Map generation and display
  - [x] Map updating engine (not on every refresh unless player is moving)
  - [ ] Population of environmental elements
  - [ ] Population of NPC/characters and important interactive items
  - [ ] Intro fade screen
- Milestones (Story)
  - [x] Cutscenes when important items are interacted with
  - [ ] Level structure
  - [ ] Level progression
  - [ ] Fades between maps/levels
- Characters
  - [ ] Creation of characters
  - [ ] Animations for characters
  - [ ] Movement and population in map
- Engine
  - [x] Main game loop (update -> render -> repeat)
  - [x] Keystoke listeners
  - [x] Building layer canvas elements
- Mobile responsiveness
  - [x] Screen size adjustments
  - [x] Handling of Retina displays
  - [ ] Touch-based input control