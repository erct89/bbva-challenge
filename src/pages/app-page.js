/* eslint-disable class-methods-use-this */
import { LitElement, html, css, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { Router } from '@lit-labs/router';

// Data Providers
import '../components/data-providers/storage-data-provider.js';
import '../components/input-button.js';

// views
import 'pwa-helper-components/pwa-install-button.js';
import 'pwa-helper-components/pwa-update-available.js';
import '../components/page-template.js';
import './home-page.js';
import './game-page.js';
import './scores-page.js';
import './rules-page.js';
import './config-page.js';

import styles from './app-page-styles.js';

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

  static properties = {
    _appHeader: { type: String },
    _appConfig: { type: Object },
    _levels: { type: Array },
    _numberCardsToFind: { type: Array },
    _router: { type: Object },
    _scores: { type: Array },
    _user: { type: String },
    _userScores: { type: Array },
    _storageDP: { type: Object },
    _notifyMessage: { type: String, status: true },
  };

  static get styles() {
    return [styles];
  }

  constructor() {
    super();
    this._appHeader = 'EAGames';
    this._appConfig = {
      numberCardsToFind: DEFAULT_NUMBER_CARDS_TO_FIND,
      level: DEFAULT_LEVEL,
    };
    this._router = new Router(this, this.routes);
    this._scores = [];
    this._user = '';
    this._userScores = [];
    this._levels = LEVELS;
    this._numberCardsToFind = NUMBER_CARDS_TO_FIND;
    this._storageDP = {};
    this._notifyMessage = '';
  }

  firstUpdated() {
    super.firstUpdated();

    this._storageDP = this.shadowRoot.querySelector('#storageDP');
    this._scores = this._storageDP.getScores(false, []);
  }

  get routes() {
    return [
      {
        path: '/',
        render: () => html`<page-template show-footer>
          <home-page
            class="content content--center"
            app-header="${this._appHeader}"
            user="${this._user}"
            @user-name-changed="${this._registerUser}"
          ></home-page>
          ${this._renderFooter}
        </page-template>`,
      },
      {
        path: '/game',
        label: 'Game',
        render: () => html`
          <page-template
            show-header
            show-nav
            show-footer
            .links="${this._links('/game')}"
          >
            ${this._renderHeader}
            <game-page
              .config="${this._appConfig}"
              @game-over="${this._registerScore}"
            ></game-page>
            ${this._renderFooter}
          </page-template>
        `,
        enter: () => this._authenticationRoute(),
      },
      {
        path: '/scores',
        label: 'Scores',
        render: () => html` <page-template
          show-header
          show-nav
          show-footer
          .links="${this._links('/scores')}"
        >
          ${this._renderHeader}

          <scores-page
            .scores="${this._scores}"
            .userScores=${this._userScores}
          ></scores-page>

          ${this._renderFooter}
        </page-template>`,
        enter: () => this._authenticationRoute(),
      },
      {
        path: '/rules',
        label: 'Rules',
        render: () => html`<page-template
          show-header
          show-nav
          show-footer
          .links="${this._links('/rules')}"
        >
          ${this._renderHeader}

          <rules-page></rules-page>

          ${this._renderFooter}
        </page-template>`,
        enter: () => this._authenticationRoute(),
      },
      {
        path: '/config',
        label: 'Configs',
        render: () => html`<page-template
          show-header
          show-nav
          show-footer
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
              @configs-change="${this._registerConfig}"
            >
            </config-page>
          </main>
          ${this._renderFooter}
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

  get _isLogin() {
    return !!this._user;
  }

  _redirect(path) {
    this._router.goto(path);
  }

  _authenticationRoute() {
    const result = this._isLogin;

    if (!result) {
      this._redirect('/');
    }

    return result;
  }

  _registerUser({ detail }) {
    const { appConfig, user, userScores } =
      this._storageDP.registerUser(detail);

    this._appConfig = appConfig || this._appConfig;
    this._user = user;
    this._userScores = userScores || this._userScores;

    this._redirect('/game');
    this._pushNotify('Register User');
  }

  _registerScore({ detail }) {
    const newScore = { ...detail, name: this._user };

    this._storageDP.registerScore(this._user, newScore);

    this._scores = this._storageDP.getScores(false, []);
    this._userScores = this._storageDP.getScores(this._user, []);
    this._pushNotify('Score Save!!');
  }

  _registerConfig({ detail }) {
    const { level, numberCardsToFind } = detail;
    this._appConfig = { level, numberCardsToFind };
    this._storageDP.saveConfig(this._user, this._appConfig);
    this._pushNotify('New Config Save!!');
  }

  _pushNotify(msg) {
    this._notifyMessage = msg;

    window.setTimeout(() => {
      this._notifyMessage = '';
    }, 1500);
  }

  _links(page) {
    return this.routes.filter(({ path, label }) => label && page !== path);
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

  get _renderFooter() {
    return html`<div slot="footer-content">
      <pwa-install-button>
        <input-button label="Install App" class="info small"></input-button>
      </pwa-install-button>
      <pwa-update-available>
        <input-button label="Update App" class="info small"></input-button>
      </pwa-update-available>
    </div>`;
  }

  render() {
    const notifyClasses = classMap({ 'notify-show': this._notifyMessage });

    return html`
      <div class="app">
        <storage-data-provider
          id="storageDP"
          host="${LOCAL_STORAGE_KEY}"
        ></storage-data-provider>
        ${this._router.outlet()}
        ${this._notifyMessage
          ? html`<div class="${notifyClasses}">
              <p>${this._notifyMessage}</p>
            </div>`
          : nothing}
      </div>
    `;
  }
}

customElements.define(AppPage.is, AppPage);
