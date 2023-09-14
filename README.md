# Description
This project was developed as a test for BBVA. The project consists of a small memory game in which you first need to register with a valid username. A valid username contains between 3 and 8 alphanumeric characters. Once registered, the user can navigate to different routes:
  - /game: The memory game where the player has to guess the positions of the indicated cards.
  - /rules: The player can view a brief guide on how to play.
  - /scores: Leaderboards for the player and other players.
  - /config: Where you can adjust the number of cards to find (1, 3, or 6) and the difficulty levels ("Easy," "Normal," and "Hard") that determine the time the user has to memorize the cards.

## Web Site

The app is available at:
https://app.netlify.com/sites/celadon-cannoli-88e2a3/deploys

## Installation

```bash
# requires node 10 & npm 6 or higher
git clone git@github.com:erct89/bbva-challenge.git && cd bbva-challenge && npm i
```

## Start

To get started:

```bash
npm start
```

## Test

### Run test

```bash
npm run test
```

### Current Coverage

![Current Coverage](https://github.com/erct89/bbva-challenge/blob/main/images/coverage-2023-09-14.png)

## Scripts

- `start` runs your app for development, reloading on file changes
- `start:build` runs your app after it has been built using the build command
- `build` builds your app and outputs it in your `dist` directory
- `test` runs your test suite with Web Test Runner
- `lint` runs the linter for your project
- `format` fixes linting and formatting errors

## Coverage

For most of the tools, the configuration is in the `package.json` to reduce the number of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.