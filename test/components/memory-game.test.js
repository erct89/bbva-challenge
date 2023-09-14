import { html, fixture, expect } from '@open-wc/testing';
import '../../src/components/memory-game.js';
import '../../src/components/input-button.js';

import sinon from 'sinon';

import { LEVELS, NUMBER_CARDS_TO_FIND } from '../../src/constants.js';

describe('MemoryGame', () => {
  let memoryGame;
  let scoreboardComponent;
  let trackerInfo;
  let board;
  let playButton;

  beforeEach(async () => {
    memoryGame = await fixture(
      html`<memory-game
        .currentLevel="${LEVELS[0]}"
        .numberCardsToFind="${NUMBER_CARDS_TO_FIND[0]}"
      ></memory-game>`
    );

    scoreboardComponent =
      memoryGame.shadowRoot.querySelector('scoreboard-game');
    trackerInfo = memoryGame.shadowRoot.querySelector('.game-tracker');
    board = memoryGame.shadowRoot.querySelector('board-game');
    playButton = memoryGame.shadowRoot.querySelector('input-button');
  });

  describe('Before start game', () => {
    it('should render the scoreboard-game, game-tracker, board-game, and buttons content by default', () => {
      expect(scoreboardComponent).to.exist;
      expect(trackerInfo).to.exist;
      expect(board).to.exist;
      expect(playButton).to.exist;
    });

    it('should be blocked and hide card the board-game, by default', () => {
      expect(board).to.exist;
      expect(board.isBoardBlocked).to.be.true;
      expect(board.showFrontCards).to.be.false;
    });
  });

  describe('Starting', () => {
    it('should hidde play  button, when "Play Game" button is clicked', async () => {
      expect(playButton).to.exist;

      playButton.click();
      await memoryGame.updateComplete;

      const button = memoryGame.shadowRoot.querySelector('input-button');
      expect(button).to.not.exist;
    });

    it('should be show cards, when "Play Game" button is clicked', async () => {
      playButton.click();
      await memoryGame.updateComplete;

      expect(board.showFrontCards).to.be.true;
    });

    it('should be unblocked cards, when "Play Game" button is clicked', async () => {
      playButton.click();
      await memoryGame.updateComplete;

      expect(board.isBoardBlocked).to.be.true;
    });

    it('should update the score when a correct card is selected', async () => {
      memoryGame._isGameStarted = true;
      memoryGame._showFrontCards = false;
      memoryGame._playingCardsToFind = ['1'];
      const initialScores = memoryGame.score;

      const playingCardShowEvent = new CustomEvent('playing-card-show', {
        detail: { id: '1' },
      });
      board.dispatchEvent(playingCardShowEvent);

      await memoryGame.updateComplete;

      expect(memoryGame.score).to.equal(initialScores + memoryGame.basePoint);
    });

    it('should not update the score when a correct card is selected', async () => {
      memoryGame._isGameStarted = true;
      memoryGame._showFrontCards = false;
      memoryGame._playingCardsToFind = ['1'];
      const initialScores = memoryGame.score;

      const playingCardShowEvent = new CustomEvent('playing-card-show', {
        detail: { id: '2' },
      });
      board.dispatchEvent(playingCardShowEvent);

      await memoryGame.updateComplete;

      expect(memoryGame.score).to.equal(initialScores);
    });

    it('should end the game when cards are selected is not correct', async () => {
      const eventSpy = sinon.spy();
      memoryGame.addEventListener('game-over', eventSpy);
      memoryGame._isGameStarted = true;
      memoryGame._showFrontCards = false;
      memoryGame._playingCardsToFind = ['1'];

      const playingCardShowEvent = new CustomEvent('playing-card-show', {
        detail: { id: '2' },
      });
      board.dispatchEvent(playingCardShowEvent);

      await memoryGame.updateComplete;

      expect(eventSpy.calledOnce).to.true;
    });
  });
});
