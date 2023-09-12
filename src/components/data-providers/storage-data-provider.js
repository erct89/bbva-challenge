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

  getUser(defaultValue) {
    return this.getLocalStorageData('user', defaultValue);
  }

  getConfig(userId, defaultValue) {
    const key = `${userId}.config`;
    return this.getLocalStorageData(key, defaultValue);
  }

  getScores(userId, defaultValue) {
    const key = userId ? `${userId}.scores` : `scores`;
    return this.getLocalStorageData(key, defaultValue);
  }

  saveUser(user) {
    return this.saveLocalStorageData('user', user);
  }

  saveConfig(userId, value) {
    const key = `${userId}.config`;
    return this.saveLocalStorageData(key, value);
  }

  saveScores(userId, value) {
    const key = userId ? `${userId}.scores` : `scores`;
    return this.saveLocalStorageData(key, value);
  }

  static _compareScores({ score: scoreA }, { score: scoreB }) {
    return scoreB - scoreA;
  }

  registerUser(user) {
    const storageConfig = this.getConfig(user);
    const storageScores = this.getScores(user);

    this.saveUser(user);

    return {
      appConfig: storageConfig,
      user,
      userScores: storageScores,
    };
  }

  registerScore(user, newScore) {
    const userScores = StorageDataProvider.updateScores([
      ...this.getScores(user, []),
      newScore,
    ]);
    const globlaScores = StorageDataProvider.updateScores([
      ...this.getScores(false, []),
      newScore,
    ]);

    this.saveScores(false, globlaScores);
    this.saveScores(user, userScores);
  }

  registerConfig(user, config) {
    this.saveConfig(user, config);
  }

  static updateScores(scoreValues) {
    return Array.from(new Set(scoreValues))
      .sort(StorageDataProvider._compareScores)
      .slice(0, 10);
  }

  render() {
    return nothing;
  }
}

customElements.define(StorageDataProvider.is, StorageDataProvider);
