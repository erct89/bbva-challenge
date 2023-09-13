import { html, fixture, expect } from '@open-wc/testing';
import '../../src/components/board-game.js'; // Asegúrate de importar el componente

describe('BoardGame', () => {
  let boardGame;

  beforeEach(async () => {
    const packOfCards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    boardGame = await fixture(
      html`<board-game .packOfCards="${packOfCards}"></board-game>`
    );
  });

  it('should render a grid of playing cards', () => {
    const playingCards = boardGame.shadowRoot.querySelectorAll('playing-card');
    expect(playingCards.length).to.equal(boardGame.packOfCards.length);

    playingCards.forEach(card => {
      expect(card.getAttribute('back-content')).to.equal('?');
    });
  });

  it('should toggle card face when clicked', async () => {
    const playingCard = boardGame.shadowRoot.querySelector('playing-card');

    expect(playingCard.isFront).to.be.false;

    playingCard.click();
    await boardGame.updateComplete;

    expect(playingCard.isFront).to.be.true;
  });

  it('should not toggle card face when board is blocked', async () => {
    boardGame.isBoardBlocked = true;
    const playingCard = boardGame.shadowRoot.querySelector('playing-card');

    expect(playingCard.isFront).to.be.false;

    playingCard.click();
    await boardGame.updateComplete;

    expect(playingCard.isFront).to.be.false;
  });

  it('should apply success class to matched cards', async () => {
    boardGame.playingCardsToFind = ['A', 'B', 'C'];
    boardGame.selectedPlayingCards = ['A', 'B'];
    const playingCards = boardGame.shadowRoot.querySelectorAll('playing-card');

    playingCards.forEach(card => {
      if (card.frontContent === 'A' || card.frontContent === 'B') {
        expect(card.classList.contains('success')).to.be.true;
      } else {
        expect(card.classList.contains('success')).to.be.false;
      }
    });
  });

  it('should apply error class to mismatched cards', async () => {
    boardGame.playingCardsToFind = ['A', 'B', 'C'];
    boardGame.selectedPlayingCards = ['A', 'D'];
    const playingCards = boardGame.shadowRoot.querySelectorAll('playing-card');

    playingCards.forEach(card => {
      if (card.frontContent === 'A' || card.frontContent === 'D') {
        expect(card.classList.contains('error')).to.be.true;
      } else {
        expect(card.classList.contains('error')).to.be.false;
      }
    });
  });

  it('should render a grid of playing cards', () => {
    const playingCards = boardGame.shadowRoot.querySelectorAll('playing-card');
    expect(playingCards.length).to.equal(boardGame.packOfCards.length);

    playingCards.forEach(card => {
      expect(card.getAttribute('back-content')).to.equal('?');
    });
  });

  it('should toggle card face when clicked', async () => {
    const playingCard = boardGame.shadowRoot.querySelector('playing-card');

    expect(playingCard.isFront).to.be.false;

    playingCard.click();
    await boardGame.updateComplete;

    expect(playingCard.isFront).to.be.true;
  });

  it('should not toggle card face when board is blocked', async () => {
    boardGame.isBoardBlocked = true;
    const playingCard = boardGame.shadowRoot.querySelector('playing-card');

    expect(playingCard.isFront).to.be.false;

    playingCard.click();
    await boardGame.updateComplete;

    expect(playingCard.isFront).to.be.false;
  });

  it('should apply success class to matched cards', async () => {
    boardGame.playingCardsToFind = ['A', 'B', 'C'];
    boardGame.selectedPlayingCards = ['A', 'B'];
    const playingCards = boardGame.shadowRoot.querySelectorAll('playing-card');

    playingCards.forEach(card => {
      if (card.frontContent === 'A' || card.frontContent === 'B') {
        expect(card.classList.contains('success')).to.be.true;
      } else {
        expect(card.classList.contains('success')).to.be.false;
      }
    });
  });

  it('should apply error class to mismatched cards', async () => {
    boardGame.playingCardsToFind = ['A', 'B', 'C'];
    boardGame.selectedPlayingCards = ['A', 'D'];
    const playingCards = boardGame.shadowRoot.querySelectorAll('playing-card');

    playingCards.forEach(card => {
      if (card.frontContent === 'A' || card.frontContent === 'D') {
        expect(card.classList.contains('error')).to.be.true;
      } else {
        expect(card.classList.contains('error')).to.be.false;
      }
    });
  });
});
