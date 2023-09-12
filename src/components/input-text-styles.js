import { css } from 'lit';

export default css`
  :host {
    --input-text-padding: var(--app-size--l);
    --input-text-fweight: var(--app-fweight--bold);
    --input-text-ffamily: var(--app-ffamily);
    --input-text-fsize: var(--app-fsize);
    --input-text-control-padding-top: var(--app-size--n);
    --input-text-control-padding-bottom: var(--app-size--l);
    --input-text-error-message-color: var(--app-color--red);
    --input-text-error-message-fsize: var(--app-fsize--m);
    --input-text-error-message-padding-bottom: var(--app-size--n);
  }

  .control {
    margin-top: var(--input-text-control-padding-top);
  }

  .control label {
    font-weight: var(--input-text-fweight);
  }

  .field {
    position: relative;
  }

  .field label {
    position: absolute;
    left: 0;
    top: var(--app-size--n);
    font-family: var(--app-ffamily);
    font-size: var(--app-fsize--n);
    color: var(--app-color--second);
    transition: 0.2s ease all;
    border: none;
    pointer-events: none;
  }

  .error-message {
    color: var(--input-text-error-message-color);
    font-size: var(--input-text-error-message-fsize);
  }

  input[type='text'],
  input[type='button'] {
    font-family: var(--app-ffamily);
    font-size: var(--app-fsize--n);
    font-weight: var(--app-fweight--bold);
    border: none;
    padding: var(--app-size--m) var(--app-size--n);
  }

  input[type='text'] {
    background-color: var(--app-size--white);
    border-bottom: 5px solid var(--app-color--yellow);
    color: var(--app-color);
    margin: var(--app-size--s) var(--app-size--zero-px);
    padding: var(--app-size--m);
  }

  input[type='text']:focus {
    outline: none;
  }

  input[type='button'] {
    font-family: var(--app-ffamily);
    font-size: var(--app-fsize--n);
    background-color: var(--app-bg--second);
    color: var(--app-color--three);
    border: none;
    padding: var(--app-size--m) var(--app-size--n);
    cursor: pointer;
  }

  input[type='button']:hover {
    box-shadow: var(--app-size--s) var(--app-size--s) var(--app-size--zero-px)
      var(--app-bg--three);
    color: var(--app-color--second);
  }

  input:focus + label,
  .filled label {
    top: calc(var(--app-size--zero-px) - var(--app-size--n));
    font-size: var(--app-fsize--xs);
    font-style: var(--app-fstyle--italic);
    color: var(--app-color--second);
  }
`;
