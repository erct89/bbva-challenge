import { LitElement, html, css } from 'lit';

import { CommonComponentMixin } from '../mixins/common-component-mixin.js';

class RulesPage extends CommonComponentMixin(LitElement) {
  static get is() {
    return 'rules-page';
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
    return html``;
  }
}

customElements.define(RulesPage.is, RulesPage);
