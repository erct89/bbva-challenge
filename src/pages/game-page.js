import { LitElement, html, css } from 'lit';
import { CommonComponentMixin } from '../mixins/common-component-mixin.js';
import { PageComponentMixin } from '../mixins/page-component-mixin.js';

import '../components/memory-game.js';

class GamePage extends PageComponentMixin(CommonComponentMixin(LitElement)) {
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
        .currentLevel="${this.config?.level}"
        .numberCardsToFind="${this.config?.numberCardsToFind}"
      >
      </memory-game>
    </section>`;
  }
}

customElements.define(GamePage.is, GamePage);
