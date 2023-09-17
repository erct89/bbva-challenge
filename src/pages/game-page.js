import { LitElement, html, css } from 'lit';
import { CommonComponentMixin } from '../mixins/common-component-mixin.js';
import { PageComponentMixin } from '../mixins/page-component-mixin.js';

import '../components/memory-game.js';

export class GamePage extends PageComponentMixin(
  CommonComponentMixin(LitElement)
) {
  static get is() {
    return 'game-page';
  }

  static get properties() {
    return {};
  }

  static get styles() {
    return css``;
  }

  render() {
    return html` <section class="content content--center">
      <memory-game
        .currentLevel="${this.get('level')}"
        .numberCardsToFind="${this.get('numberCardsToFind')}"
      >
      </memory-game>
    </section>`;
  }
}

customElements.define(GamePage.is, GamePage);
