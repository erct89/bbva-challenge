import { LitElement, css, html } from 'lit';

class GamePage extends LitElement {
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
