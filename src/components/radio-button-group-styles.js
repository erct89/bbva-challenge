import { css } from 'lit';

export default css`
  :host {
    --radio-button-group-ffamily: var(--app-ffamily);
    --radio-button-group-fsize: var(--app-fsize--n);

    --radio-button-group-header-padding: var(--app-size--m);

    --radio-button-group-label-font-size: var(--app-fsize--n);
    --radio-button-group-label-color: var(--app-color);
    --radio-button-group-label-gap: var(--app-size--n);
    --radio-button-group-label-padding: var(--app-size--s);
    --radio-button-group-input-border-color: var(--app-bg--second);
    --radio-button-group-input-shadow-color: var(--app-color);
    --radio-button-group-input-shadow-size: var(--app-size--n);

    --radio-button-group-header-margin: var(--app-size--zero-px);
    --radio-button-group-header-padding-lr: var(--app-size--zero-px);
    --radio-button-group-header-padding-tb: var(--app-size--l);

    display: flex;
    flex-direction: column;
    font-family: var(--radio-button-group-ffamily);
    font-size: var(--radio-button-group-fsize);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: var(--radio-button-group-header-margin);
    padding: var(--radio-button-group-header-padding-tb)
      var(--radio-button-group-header-padding-lr);
  }

  label {
    display: grid;
    grid-template-columns: 1em auto;
    gap: var(--radio-button-group-label-gap);
    padding-top: var(--radio-button-group-label-padding);
    padding-bottom: var(--radio-button-group-label-padding);
  }

  input[type='radio'] {
    line-height: 1.5;
    /* Add if not using autoprefixer */
    -webkit-appearance: none;
    /* Remove most all native input styles */
    appearance: none;
    /* For iOS < 15 */
    background-color: var(--radio-button-group-input-border-color);
    /* Not removed via appearance */
    margin: 0;

    font: inherit;
    color: currentColor;
    width: 1.15em;
    height: 1.15em;
    border: 0.15em solid var(--radio-button-group-input-border-color);
    border-radius: 50%;
    transform: translateY(-0.075em);

    display: grid;
    place-content: center;
  }

  input[type='radio']::before {
    content: '';
    width: 0.65em;
    height: 0.65em;
    border-radius: 50%;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset var(--radio-button-group-input-shadow-size)
      var(--radio-button-group-input-shadow-size)
      var(--radio-button-group-input-shadow-color);
    background-color: CanvasText;
  }

  input[type='radio']:checked::before {
    transform: scale(1);
  }

  h4 {
    padding-top: var(--radio-button-group-header-padding);
    padding-bottom: var(--radio-button-group-header-padding);
  }
`;
