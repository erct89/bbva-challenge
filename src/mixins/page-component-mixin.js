import { dedupeMixin } from '@open-wc/dedupe-mixin';

export const PageComponentMixin = dedupeMixin(
  superClass =>
    class extends superClass {
      static get properties() {
        return {
          _config: { type: Object, state: true },
        };
      }

      constructor() {
        super();
        this._config = {};
      }

      get config() {
        return this._config;
      }

      set config(config = {}) {
        const oldConfig = this._config || {};
        this._config = { ...oldConfig, ...config };
      }

      getData(key, defaultValue) {
        return this._config[key] ?? defaultValue;
      }

      setData(key, value) {
        this._config = { ...this._config, [key]: value };
      }
    }
);
