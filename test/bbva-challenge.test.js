import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../src/bbva-challenge.js';

import {
  LEVELS,
  NUMBER_CARDS_TO_FIND,
  DEFAULT_LEVEL,
  DEFAULT_NUMBER_CARDS_TO_FIND,
} from '../src/constants.js';

describe('BbvaChallenge', () => {
  let element;
  let appPage;

  beforeEach(async () => {
    element = await fixture(html`<bbva-challenge></bbva-challenge>`);
    window.localStorage.clear();
    appPage = element.shadowRoot.querySelector('app-page');
    await appPage.updateComplete;
  });

  it('renders the initial view correctly', () => {
    const homePage = appPage.shadowRoot.querySelector('home-page');
    expect(homePage).to.exist;
  });

  it('redirects to the game page after registering a user', async () => {
    // Simulate user registration
    const userName = 'testuser';
    const homePage = appPage.shadowRoot.querySelector('home-page');
    homePage.dispatchEvent(
      new CustomEvent('user-name-changed', { detail: userName })
    );
    await appPage.updateComplete;
    await new Promise(resolve => {
      setTimeout(resolve, 500);
    });

    // Wait for possible async operations to complete
    const gamePage = appPage.shadowRoot.querySelector('game-page');
    expect(gamePage).to.exist;
  });

  it('redirects to the home page if not logged in when accessing game, scores, or rules pages', async () => {
    appPage._redirect('/game');
    await appPage.updateComplete;
    expect(window.location.pathname).to.equal('/');

    appPage._redirect('/scores');
    await appPage.updateComplete;
    expect(window.location.pathname).to.equal('/');

    appPage._redirect('/rules');
    await appPage.updateComplete;
    expect(window.location.pathname).to.equal('/');
  });

  describe('Login User', () => {
    beforeEach(async () => {
      const userName = 'testuser';
      const homePage = appPage.shadowRoot.querySelector('home-page');
      homePage.dispatchEvent(
        new CustomEvent('user-name-changed', { detail: userName })
      );
      await appPage.updateComplete;
      await new Promise(resolve => {
        setTimeout(resolve, 500);
      });
    });

    it('registers a score correctly', async () => {
      const scoreData = { name: 'testuser', score: 100 };
      expect(appPage._scores).to.deep.equal([]);
      // Simulate game over event with score

      const gamePage = appPage.shadowRoot.querySelector('game-page');
      gamePage.dispatchEvent(
        new CustomEvent('game-over', { detail: scoreData })
      );

      // Wait for possible async operations to complete
      await appPage.updateComplete;

      expect(appPage._scores).to.deep.equal([scoreData]);
      // Assert other expected behavior here
    });

    it('registers a configuration change correctly', () => {
      const newConfig = {
        level: LEVELS[1],
        numberCardsToFind: NUMBER_CARDS_TO_FIND[1],
      };
      expect(appPage._appConfig).to.deep.equal({
        level: DEFAULT_LEVEL,
        numberCardsToFind: DEFAULT_NUMBER_CARDS_TO_FIND,
      });

      appPage._registerConfig({ detail: newConfig });

      expect(appPage._appConfig).to.deep.equal({ ...newConfig });
    });

    it('renders the header and footer correctly', () => {
      const headerLeft = appPage.shadowRoot.querySelector(
        '[slot="header-left"]'
      );
      const headerCenter = appPage.shadowRoot.querySelector(
        '[slot="header-center"]'
      );
      const headerRight = appPage.shadowRoot.querySelector(
        '[slot="header-right"]'
      );
      const footerContent = appPage.shadowRoot.querySelector(
        '[slot="footer-content"]'
      );

      expect(headerLeft).to.exist;
      expect(headerCenter).to.exist;
      expect(headerRight).to.exist;
      expect(footerContent).to.exist;
    });
  });
});
