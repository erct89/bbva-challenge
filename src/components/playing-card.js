/* eslint-disable lit-a11y/click-events-have-key-events */
import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { CommonComponentMixin } from '../mixins/common-component-mixin.js';

import styles from './playing-card-styles.js';

/**
 * Custom element representing a playing card that can be toggled between its front and back faces.
 * @element playing-card
 */
class PlayingCard extends CommonComponentMixin(LitElement) {
  /**
   * Properties for configuring the behavior and content of the PlayingCard component.
   * @property {Boolean} isFront - Determines whether the card is currently displaying its front face.
   * @property {String} frontContent - The content to be displayed on the front face of the card.
   * @property {String} backContent - The content to be displayed on the back face of the card.
   * @property {Boolean} autoFlipped - If set to `true`, the card will automatically toggle between its front and back faces when clicked.
   */
  static get properties() {
    return {
      isFront: {
        type: Boolean,
        attribute: 'is-front',
      },
      frontContent: {
        type: String,
        attribute: 'front-content',
      },
      backContent: {
        type: String,
        attribute: 'back-content',
      },
      autoFlipped: {
        type: Boolean,
        attribute: 'auto-flipped',
      },
    };
  }

  static get styles() {
    return [styles];
  }

  constructor() {
    super();
    this.isFront = false;
    this.autoFlipped = false;
    this.frontContent = 'Front';
    this.backContent = 'Back';
  }

  /**
   * Toggles the card between its front and back faces.
   * @public
   * @event playing-card-toggle
   * @event playing-card-show
   */
  toggleCardFace() {
    this.isFront = !this.isFront;

    this._dispatch('playing-card-toggle', {
      id: this.frontContent,
      isFront: this.isFront,
    });

    if (this.isFront) {
      this._dispatch('playing-card-show', { id: this.frontContent });
    }
  }

  /**
   * Handles the click event on the card. If `autoFlipped` is `true`, it toggles the card's face.
   * @private
   */
  _handleClick() {
    if (!this.autoFlipped) return;
    this.toggleCardFace();
  }

  render() {
    return html`<div
      class="${classMap({ card: true, flipped: !this.isFront })}"
      @click="${this._handleClick}"
    >
      <div class="card-back">${this.backContent}</div>
      <div class="card-front">${this.frontContent}</div>
    </div>`;
  }
}

customElements.define('playing-card', PlayingCard);
