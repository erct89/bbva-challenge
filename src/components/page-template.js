import { LitElement, html, css, nothing } from 'lit';

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
    return css``;
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

  _renderHeader() {
    return this.showHeader
      ? html` <header>
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
          ${this._renderNavBar()}
        </header>`
      : nothing;
  }

  static _renderLink(link) {
    return html`
      <div>
        <a class="simple" href="${link?.path}">${link?.label}</a>
      </div>
    `;
  }

  _renderNavBar() {
    return this._showNav
      ? html` <nav>${this.links.map(PageTemplate._renderLink)}</nav> `
      : nothing;
  }

  _renderFooter() {
    this.hideFooter = this.showFooter
      ? html` <footer>
          <slot name="footer-content"></slot>
        </footer>`
      : nothing;
  }

  render() {
    return html`
      <section>
        ${this._renderHeader()}
        <main>
          <slot></slot>
        </main>
      </section>
    `;
  }
}

customElements.define(PageTemplate.is, PageTemplate);
