import { LitElement, html, css } from 'lit';
import { Router } from '@lit-labs/router';

import './components/data-providers/storage-data-provider.js';

import './home-page.js';
import './game-page.js';
import './scores-page.js';
import './rules-page.js';

import {
  LOCAL_STORAGE_KEY
} from './constants.js';

class AppPage extends LitElement {
  static get is() {
    return 'app-page';
  }

  static get properties() {
    return {
      _router: { type: Object },
      _storageDP: { type: Object },
    };
  }

  static get styles() {
    return css``;
  }

  constructor() {
    super();
    this._router = new Router(this, this.routes);
    this._storageDP = {};
  }

  firstUpdated() {
    super.firstUpdated();

    this._storageDP = this.shadowRoot.querySelector('#storageDP');
  }

  get routes() {
    return [
      {
        path: '/',
        render: () => html`<page-template>
          <home-page></home-page>
        </page-template>`,
      },
      {
        path: '/game',
        label: 'Memoriy',
        render: () => html`
          <page-template show-header show-nav>
            ${this._renderHeader}
            <game-page></game-page>
          </page-template>
        `,
        enter: () => this._authenticationRoute(),
      },
      {
        path: '/scores',
        label: 'Scores',
        render: () => html` <page-template show-header show-nav>
          ${this._renderHeader}

          <scores-page></scores-page>
        </page-template>`,
        enter: () => this._authenticationRoute(),
      },
      {
        path: '/rules',
        label: 'Rules',
        render: () => html`<page-template show-header show-nav>
          ${this._renderHeader}
          <rules-page></rules-page>
        </page-template>`,
        enter: () => this._authenticationRoute(),
      },
      {
        path: '/config',
        label: 'Configs',
        render: () => html`<page-template show-header show-nav>
          ${this._renderHeader}
          <main>
            <config-page> </config-page>
          </main>
        </page-template>`,
        enter: () => this._authenticationRoute(),
      },
      {
        path: '/*',
        enter: () => {
          this._redirect('/');
          return false;
        },
      },
    ];
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
      <storage-data-provider id="storageDP" host="${LOCAL_STORAGE_KEY}"></storage-data-provider>
      <main>${this._router.outlet()}</main>
    </div>`;
  }
}

customElements.define(AppPage.is, AppPage);
