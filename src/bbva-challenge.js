import { LitElement, html } from 'lit';

import 'urlpattern-polyfill';
import './pages/app-page.js';

class BbvaChallenge extends LitElement {
  render() {
    return html`<app-page></app-page>`;
  }
}

customElements.define('bbva-challenge', BbvaChallenge);
