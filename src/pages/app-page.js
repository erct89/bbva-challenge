import { LitElement, html, css } from 'lit';
import { Router } from '@lit-labs/router';

import '../components/data-providers/storage-data-provider.js';

import '../components/page-template.js';
import './home-page.js';
import './game-page.js';
import './scores-page.js';
import './rules-page.js';

import {
  LOCAL_STORAGE_KEY,
  LEVELS,
  NUMBER_CARDS_TO_FIND,
  DEFAULT_LEVEL,
  DEFAULT_NUMBER_CARDS_TO_FIND,
} from '../constants.js';

class AppPage extends LitElement {
  static get is() {
    return 'app-page';
  }

  static get properties() {
    return {
      _appHeader: { type: String },
      _appConfig: { type: Object },
      _levels: { type: Array },
      _numberCardsToFind: { type: Array },
      _router: { type: Object },
      _scores: { type: Array },
      _storageDP: { type: Object },
      _user: { type: String },
      _userScores: { type: Array },
    };
  }

  static get styles() {
    return css`
      .content {
        width: 100%;
        height: 100%;
      }

      .content--center {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `;
  }

  constructor() {
    super();
    this._appHeader = 'EAGames';
    this._appConfig = {
      numberCardsToFind: DEFAULT_NUMBER_CARDS_TO_FIND,
      level: DEFAULT_LEVEL,
    };
    this._levels = LEVELS;
    this._numberCardsToFind = NUMBER_CARDS_TO_FIND;
    this._router = new Router(this, this.routes);
    this._scores = [];
    this._storageDP = {};
    this._user = '';
    this._userScores = [];
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
          <home-page
            class="content content--center"
            app-header="${this._appHeader}"
            user="${this._user}"
            @user-name-changed="${this._registerUser}"
          >
          </home-page>
        </page-template>`,
      },
      {
        path: '/game',
        label: 'Game',
        enter: () => this._authenticationRoute(),
        render: () => html`
          <page-template show-header show-nav .links="${this._links('/game')}">
            ${this._renderHeader}
            <game-page
              class="content content--center"
              .config="${this._appConfig}"
            ></game-page>
          </page-template>
        `,
      },
      {
        path: '/scores',
        label: 'Scores',
        enter: () => this._authenticationRoute(),
        render: () => html` <page-template
          show-header
          show-nav
          .links="${this._links('/scores')}"
        >
          ${this._renderHeader}
          <scores-page
            .scores="${this._scores}"
            .userScores=${this._userScores}
          ></scores-page>
        </page-template>`,
      },
      {
        path: '/rules',
        label: 'Rules',
        enter: () => this._authenticationRoute(),
        render: () => html`<page-template
          show-header
          show-nav
          .links="${this._links('/rules')}"
        >
          ${this._renderHeader}
          <rules-page></rules-page>
        </page-template>`,
      },
      {
        path: '/config',
        label: 'Configs',
        enter: () => this._authenticationRoute(),
        render: () => html`<page-template
          show-header
          show-nav
          .links="${this._links('/rules')}"
        >
          ${this._renderHeader}
          <main>
            <config-page
              .config="${{
                ...this._appConfig,
                levels: this._levels,
                optionsNumbersCardsToFind: this._numberCardsToFind,
              }}"
            ></config-page>
          </main>
        </page-template>`,
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

  _authenticationRoute() {
    const result = this._isLogin;

    if (!result) {
      this._redirect('/');
    }

    return result;
  }

  _links(page) {
    return this.routes.filter(({ path, label }) => label && page !== path);
  }

  _redirect(path) {
    this._router.goto(path);
  }

  _registerUser({ detail }) {
    const { appConfig, user, userScores } =
      this._storageDP.registerUser(detail);

    this._appConfig = appConfig || this._appConfig;
    this._user = user;
    this._userScores = userScores || this._userScores;

    this._redirect('/game');
  }

  get _isLogin() {
    return !!this._user;
  }

  get _renderHeader() {
    return html`<div class="content content--center" slot="header-left">
        <span>${this._user}</span>
      </div>
      <div class="content content--center" slot="header-center">
        <div>
          <h5>${this._appHeader}</h5>
        </div>
      </div>
      <div class="content content--center" slot="header-right">
        <link-button class="info rounded" href="/">X</link-button>
      </div>`;
  }

  render() {
    return html`<div class="app">
      <storage-data-provider
        id="storageDP"
        host="${LOCAL_STORAGE_KEY}"
      ></storage-data-provider>
      <main>${this._router.outlet()}</main>
    </div>`;
  }
}

customElements.define(AppPage.is, AppPage);
