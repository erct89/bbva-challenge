import { LitElement, nothing } from 'lit';

class StorageDataProvider extends LitElement {
  static get is() {
    return `storage-data-provider`;
  }

  static get properties() {
    return {
      host: {
        type: String,
      },
    };
  }

  constructor() {
    super();
    this.host = '';
  }

  isLogin() {
    return !!this.getUser();
  }

  saveLocalStorageData(key, data) {
    if (!key || !data) return;
    localStorage.setItem(`${this.host}.${key}`, JSON.stringify(data));
  }

  getLocalStorageData(key, defaultValue) {
    if (!key) return null;
    const storeData = localStorage.getItem(`${this.host}.${key}`);
    return storeData ? JSON.parse(storeData) : defaultValue;
  }

  render() {
    return nothing;
  }
}

customElements.define(StorageDataProvider.is, StorageDataProvider);
