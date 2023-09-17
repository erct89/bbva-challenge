import { html } from 'lit';
import { dedupeMixin } from '@open-wc/dedupe-mixin';

export const PageComponentMixin = dedupeMixin(
  superClass =>
    class PageComponentMixinBase extends superClass {
      static get properties() {
        return {
          _context: { type: Object, state: true },
          _config: { type: Object, state: true },
        };
      }

      constructor() {
        super();
        this._context = {};
        this._config = {};
      }

      get ctx() {
        return this._context;
      }

      set context(context) {
        this._context = context;
      }

      get config() {
        return this._config;
      }

      set config(config = {}) {
        const oldConfig = this._config || {};
        this._config = { ...oldConfig, ...config };
      }

      get(key, defaultValue) {
        return this._config[key] ?? defaultValue;
      }

      set(key, value) {
        this._config = { ...this._config, [key]: value };
      }

      static getRenderRoute(configs) {
        const {
          element,
          config = {},
          context = {},
          tplHeader = () => html``,
          tplFooter = () => html``,
          links = [],
          showHeader = true,
          showNav = true,
          showFooter = true,
        } = configs || {};
        const pageElement = document.createElement(element.is);
        pageElement.config = config;
        pageElement.context = context;

        return () => html`<page-template
          ?show-header="${showHeader}"
          ?show-nav="${showNav}"
          ?show-footer="${showFooter}"
          .links="${links}"
        >
          ${tplHeader()}
          <main>${pageElement}</main>
          ${tplFooter()}
        </page-template>`;
      }
    }
);
