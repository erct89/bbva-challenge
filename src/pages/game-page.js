import { LitElement, css, html } from 'lit';

import { CommonComponentMixin } from '../mixins/common-component-mixin.js';

class GamePage extends CommonComponentMixin(LitElement) {
  static get is() {
    return 'game-page';
  }

  static get properties() {
    return {};
  }

  static get styles() {
    return css``;
  }

  // constructor() {
  //   super();
  // }

  render() {
    return html`Game page`;
  }
}

customElements.define(GamePage.is, GamePage);
