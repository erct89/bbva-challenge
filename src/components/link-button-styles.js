import { css } from 'lit';

export default css`
  :host {
    --link-button-ffamily: var(--app-ffamily);
    --link-button-fsize: var(--app-fsize--n);
    --link-button-fweight: var(--app-fweight--bold);
    --link-button-color: var(--app-color--three);
    --link-button-background-color: var(--app-bg--second);
    --link-button-hover-color: var(--app-color--second);
    --link-button-padding: var(--app-size--m) var(--app-size--n);
    --link-button-margin: var(--app-size--m) var(--app-size--zero-px);
    --link-button-box-shadow: var(--app-size--s) var(--app-size--s)
      var(--app-size--zero-px) var(--app-bg--three);
    --link-button-bradius: var(--app-size--s);

    display: block;
    box-sizing: border-box;
  }

  a {
    font-family: var(--link-button-ffamily);
    font-size: var(--link-button-fsize);
    font-weight: var(--link-button-fweight);
    text-decoration: none;
    background-color: var(--link-button-background-color);
    color: var(--link-button-color);
    border: none;
    border-radius: var(--link-button-bradius);
    padding: var(--link-button-padding);
    cursor: pointer;
  }

  a:hover {
    box-shadow: var(--link-button-box-shadow);
    color: var(--link-button-hover-color);
  }

  :host(.rounded) {
    --link-button-bradius: var(--link-button-fsize);
  }

  :host(.small) {
    --link-button-fsize: var(--link-button-fsize);
  }

  :host(.simple) {
    --link-button-background-color: inherid;
    --link-button-color: var(--app-color--three);
    --link-button-hover-color: var(--app-color--four);
    --link-button-box-shadow: none;
  }

  :host(.info) {
    --link-button-background-color: var(--app-bg--three);
    --link-button-color: var(--app-color--three);
    --link-button-hover-color: var(--app-color);
    --link-button-box-shadow: var(--app-size--s) var(--app-size--s)
      var(--app-size--zero-px) var(--app-color);
  }

  :host(.warning) {
    --link-button-background-color: var(--app-bg--warning);
    --link-button-color: var(--app-color--warning);
    --link-button-hover-color: var(--app-color);
    --link-button-box-shadow: var(--app-size--s) var(--app-size--s)
      var(--app-size--zero-px) var(--app-color);
  }

  :host(.success) {
    --link-button-background-color: var(--app-bg--success);
    --link-button-color: var(--app-color--success);
    --link-button-hover-color: var(--app-color);
    --link-button-box-shadow: var(--app-size--s) var(--app-size--s)
      var(--app-size--zero-px) var(--app-color);
  }
`;
