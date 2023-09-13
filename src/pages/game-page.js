import { LitElement, css, html } from 'lit';

import { CommonComponentMixin } from '../mixins/common-component-mixin.js';
import '../components/memory-game.js';

class GamePage extends CommonComponentMixin(LitElement) {
  static get is() {
    return 'game-page';
  }

  static get properties() {
    return {
      user: {
        type: String,
      },
      config: {
        type: Object,
      },
    };
  }

  static get styles() {
    return css``;
  }

  constructor() {
    super();
    this.config = {};
  }

  render() {
    return html`
      <div>
        <main>
          <memory-game
            .currentLevel="${this.config?.level}"
            .numberCardsToFind="${this.config?.numberCardsToFind}"
          >
          </memory-game>
        </main>
      </div>
    `;
  }
}

customElements.define(GamePage.is, GamePage);
