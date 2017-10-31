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

### Room Object

A simple room object must have at least 3 properties:

- *description*, which can be either a string or a function with the signature *(state, world)*
- *items*, an array containing item references
- *actors*, an array containing actor references

```javascript
const room = {
  description: "You walk into a dark room.",
  items: [],
  actors: []
};
```

Additionally you can use the game engine hooks to specify extra behaviour:

- *onEnter(state, world)*
- *onExit(state, world)*

