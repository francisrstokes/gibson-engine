# Gibson Engine
A minimalist text game (interactive fiction) engine, inspired by the original [Quest engine](http://textadventures.co.uk/quest).

## What is the Gibson engine?

It's an engine for creating [text based games](https://en.wikipedia.org/wiki/Text-based_game), or [interactive fiction](https://en.wikipedia.org/wiki/Interactive_fiction) using javascript.

## World format

Games are specified by passing the engine a 'world' object. A world consists of 3 properties:

```javascript
const myWorld = {
  rooms: {},
  items: {},
  actors: {}
}
```

Rooms describe places in game, items describe interactable objects, and actors are NPC characters the player interacts with.

