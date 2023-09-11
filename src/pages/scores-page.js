import { LitElement, html, css } from 'lit';

class ScoresPage extends LitElement {
  static get is() {
    return 'scores-page';
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
    return html`Scores Page`;
  }
}

customElements.define(ScoresPage.is, ScoresPage);
