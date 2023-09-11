import { LitElement, html, css } from 'lit';

import './home-page.js';
import './game-page.js';
import './scores-page.js';
import './rules-page.js';

class AppPage extends LitElement {
  static get is() {
    return 'app-page';
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

  static get _showHeader() {
    return true;
  }

  static get _links() {
    return [{ path: '/', label: 'Home' }];
  }

  get _renderHeader() {
    return html`<div slot="header-left">
      <div>
        <h5>${this._appHeader}</h5>
      </div>
    </div>`;
  }

  render() {
    return html`<div class="app">
      <page-template
        ?show-header="${this._showHeader}"
        ?show-nav="${this._showHeader}"
        .links="${this._links}"
      >
        ${this._renderHeader}
        <main>App PAGE</main>
      </page-template>
    </div>`;
  }
}

customElements.define(AppPage.is, AppPage);
