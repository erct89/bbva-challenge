/* eslint-disable class-methods-use-this */
import { LitElement, html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { Router } from '@lit-labs/router';

// Data Providers
import '../components/data-providers/storage-data-provider.js';
import '../components/input-button.js';

// views
import 'pwa-helper-components/pwa-install-button.js';
import 'pwa-helper-components/pwa-update-available.js';
import { PageTemplate } from '../components/page-template.js';
import { HomePage } from './home-page.js';
import { GamePage } from './game-page.js';
import { ScoresPage } from './scores-page.js';
import { RulesPage } from './rules-page.js';
import { ConfigPage } from './config-page.js';

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
    this._scores = [];
    this._user = '';
    this._userScores = [];
    this._levels = LEVELS;
    this._numberCardsToFind = NUMBER_CARDS_TO_FIND;
    this._storageDP = {};
    this._notifyMessage = '';
    this._router = new Router(this, this.routes);
  }

  firstUpdated() {
    super.firstUpdated();

    this._storageDP = this.shadowRoot.querySelector('#storageDP');
    this._scores = this._storageDP.getScores(false, []);
  }

  get routes() {
    const routes = [
      {
        config: { appHeader: this._appHeader, user: this._user },
        element: HomePage,
        path: '/',
        showHeader: false,
        showFooter: false,
        showNav: false,
      },
      {
        config: this._appConfig,
        element: GamePage,
        enter: true,
        label: 'Game',
        path: '/game',
      },
      {
        config: { scores: this._scores, userScores: this._userScores },
        element: ScoresPage,
        enter: true,
        label: 'Scores',
        path: '/scores',
      },
      {
        element: RulesPage,
        enter: true,
        label: 'Rules',
        path: '/rules',
      },
      {
        config: {
          ...this._appConfig,
          levels: this._levels,
          optionsNumbersCardsToFind: this._numberCardsToFind,
        },
        element: ConfigPage,
        enter: true,
        label: 'Configs',
        path: '/configs',
      },
      {
        enter: () => {
          this._redirect('/');
          return false;
        },
        path: '/*',
        showHeader: false,
        showFooter: false,
        showNav: false,
      }
    ];

    return PageTemplate.generateRoutes({
      routes,
      context: this,
      tplHeader: () => this._renderHeader,
      tplFooter: () => this._renderFooter,
      enter: () => this._authenticationRoute(),
    });
  }

  getRenderRoute(
    path,
    content,
    config,
    showHeader = true,
    showNav = true,
    showFooter = true
  ) {
    return () => html`<page-template
      ?show-header="${showHeader}"
      ?show-nav="${showNav}"
      ?show-footer="${showFooter}"
      .links="${this._links(path)}"
    >
      ${this._renderHeader}
      <main>${content(config)}</main>
      ${this._renderFooter}
    </page-template>`;
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
      <div
        class="app"
        @user-name-changed="${this._registerUser}"
        @game-over="${this._registerScore}"
        @configs-change="${this._registerConfig}"
      >
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
