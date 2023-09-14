import { html, fixture, expect } from '@open-wc/testing';
import '../../src/components/memory-game.js';
import '../../src/components/scoreboard-game.js';
import '../../src/components/board-game.js';
import '../../src/components/input-button.js';
import '../../src/pages/game-page.js';

describe('GamePage', () => {
  let gamePage;

  beforeEach(async () => {
    gamePage = await fixture(html`<game-page></game-page>`);
  });

  it('renders a MemoryGame component with the correct props', async () => {
    gamePage.config = { level: {}, numberCardsToFind: {} };

    const memoryGame = gamePage.shadowRoot.querySelector('memory-game');
    expect(memoryGame).to.exist;
    await gamePage.updateComplete;

    // Verifica que se pasen las propiedades correctas al MemoryGame
    expect(memoryGame.currentLevel).to.deep.equal({});
    expect(memoryGame.numberCardsToFind).to.deep.equal({});
  });

  it('updates MemoryGame props when config changes', async () => {
    const newConfig = {
      level: { value: 'Intermediate' },
      numberCardsToFind: { value: 10 },
    };

    gamePage.config = newConfig;
    await gamePage.updateComplete;

    const memoryGame = gamePage.shadowRoot.querySelector('memory-game');
    expect(memoryGame).to.exist;

    // Verifica que las propiedades se actualicen correctamente
    expect(memoryGame.currentLevel).to.deep.equal(newConfig.level);
    expect(memoryGame.numberCardsToFind).to.deep.equal(
      newConfig.numberCardsToFind
    );
  });
});
