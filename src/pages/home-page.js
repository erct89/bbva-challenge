import { LitElement, css, html } from 'lit';

import { CommonComponentMixin } from '../mixins/common-component-mixin.js';

class HomePage extends CommonComponentMixin(LitElement) {
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
