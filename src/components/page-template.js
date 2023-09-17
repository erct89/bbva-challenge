import { LitElement, html, nothing } from 'lit';

import styles from './page-template-styles.js';

import './link-button.js';

export class PageTemplate extends LitElement {
  static get is() {
    return `page-template`;
  }

  static get properties() {
    return {
      links: { type: Array },
      showFooter: { type: Boolean, attribute: 'show-footer' },
      showHeader: { type: Boolean, attribute: 'show-header' },
      showNav: { type: Boolean, attribute: 'show-nav' },
    };
  }

  static get styles() {
    return [styles];
  }

  constructor() {
    super();
    this.links = [];
    this.showFooter = false;
    this.showHeader = false;
    this.showNav = false;
  }

  get _showNav() {
    return this.showNav && this.links.length > 0;
  }

  get _renderHeader() {
    return this.showHeader
      ? html`<header>
          <div class="header">
            <div class="header-left">
              <slot name="header-left"></slot>
            </div>
            <div class="header-center">
              <slot name="header-center"></slot>
            </div>
            <div class="header-right">
              <slot name="header-right"></slot>
            </div>
          </div>
          ${this._renderNavBar}
        </header>`
      : nothing;
  }

  static _renderLink(link) {
    return html`
      <div>
        <link-button class="simple" href="${link?.path}"
          >${link?.label}</link-button
        >
      </div>
    `;
  }

  get _renderNavBar() {
    return this._showNav
      ? html` <nav>${this.links.map(PageTemplate._renderLink)}</nav> `
      : nothing;
  }

  get _renderFooter() {
    return this.showFooter
      ? html` <footer>
          <slot name="footer-content"></slot>
        </footer>`
      : nothing;
  }

  static links(routes, page) {
    return routes.filter(({ path, label }) => label && page !== path);
  }

  static generateRoute(configs) {
    const {
      path,
      label,
      element,
      config = {},
      context = {},
      tplHeader,
      tplFooter,
      links = [],
      showHeader,
      showNav,
      showFooter,
      enter,
    } = configs;
    const render =
      element &&
      element.getRenderRoute({
        context,
        config,
        tplHeader,
        tplFooter,
        links,
        element,
        showHeader,
        showNav,
        showFooter,
      });

    return { path, label, enter, render };
  }

  static generateRoutes({ routes, context, enter, tplFooter, tplHeader }) {
    const addEnter = (routerEnter, commonEnter) => {
      const options = {
        function: routerEnter,
        boolean: routerEnter ? commonEnter : () => true,
        default: () => true,
      };
      return options[typeof enter] || options.default;
    };

    return routes.map(routeConfig =>
      PageTemplate.generateRoute({
        ...routeConfig,
        tplFooter,
        tplHeader,
        context,
        enter: addEnter(routeConfig.enter, enter),
        links: PageTemplate.links(routes, routeConfig.path),
      })
    );
  }

  render() {
    return html`
      <section>
        ${this._renderHeader}
        <main>
          <slot></slot>
        </main>
        ${this._renderFooter}
      </section>
    `;
  }
}

customElements.define(PageTemplate.is, PageTemplate);
