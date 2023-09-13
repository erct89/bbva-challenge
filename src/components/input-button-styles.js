import { css } from 'lit';

export default css`
  :host {
    --input-button-ffamily: var(--app-ffamily);
    --input-button-fsize: var(--app-fsize--n);
    --input-button-fweight: var(--app-fweight--bold);
    --input-button-color: var(--app-color--three);
    --input-button-background-color: var(--app-bg--second);
    --input-button-hover-color: var(--app-color--second);
    --input-button-padding: var(--app-size--m) var(--app-size--n);
    --input-button-box-shadow: var(--app-size--s) var(--app-size--s)
      var(--app-size--zero-px) var(--app-bg--three);
    --input-button-bradius: var(--app-size--s);

    display: block;
    border-radius: 1rem;
  }

  :host(.small) {
    --input-button-fsize: var(--app-fsize--m);
  }

  :host(.info) {
    --input-button-background-color: var(--app-bg--three);
    --input-button-color: var(--app-color--three);
    --input-button-hover-color: var(--app-color);
    --input-button-box-shadow: var(--app-size--s) var(--app-size--s)
      var(--app-size--zero-px) var(--app-color);
  }

  :host(.warning) {
    --input-button-background-color: var(--app-bg--warning);
    --input-button-color: var(--app-color--warning);
    --input-button-hover-color: var(--app-color);
    --input-button-box-shadow: var(--app-size--s) var(--app-size--s)
      var(--app-size--zero-px) var(--app-color);
  }

  :host(.success) {
    --input-button-background-color: var(--app-bg--success);
    --input-button-color: var(--app-color--success);
    --input-button-hover-color: var(--app-color);
    --input-button-box-shadow: var(--app-size--s) var(--app-size--s)
      var(--app-size--zero-px) var(--app-color);
  }

  input[type='button'] {
    font-family: var(--input-button-ffamily);
    font-size: var(--input-button-fsize);
    font-weight: var(--input-button-fweight);
    background-color: var(--input-button-background-color);
    color: var(--input-button-color);
    border: none;
    border-radius: var(--input-button-bradius);
    padding: var(--input-button-padding);
    cursor: pointer;
  }

  input[type='button']:hover {
    box-shadow: var(--input-button-box-shadow);
    color: var(--input-button-hover-color);
  }
`;
