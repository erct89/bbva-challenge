import { LitElement, css, html } from 'lit';

class HomePage extends LitElement {
  static get is() {
    return 'home-page';
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
    return html`Home page`;
  }
}

customElements.define(HomePage.is, HomePage);
