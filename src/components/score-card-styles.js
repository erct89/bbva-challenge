import { css } from 'lit';

export default css`
  /* Estilos generales del componente ScoreCard */
  :host {
    --score-card-font-family: var(--app-font-family, Arial, sans-serif);
    --score-card-font-size: var(--app-font-size--n, 1rem);
    --score-card-font-weign: var(--app-font-weight, bold);
    --score-card-text-color: var(--app-color--dark-gray, rgba(51, 51, 51, 0.8));
    --score-card-bg: var(--app-color--white, #ffffff);
    --score-card-border: var(
      --app-border--fit-1,
      1px solid rgba(204, 204, 204, 0.8)
    );
    --score-card-margin: var(--app-margin--s, 0.5rem);
    --score-card-padding: var(--app-padding--n, 1rem);
    --score-card-hover-bg: var(
      --app-color--ligth-gray,
      #rgba(245, 245, 245, 0.8)
    );
    --score-card-gap: var(--app-size-s, 0.5rem);
    --score-card-info-additional-margin-top: var(--app-margin--n, 1rem);
    --score-card-info-additional-margin-bottom: var(--app-margin--s, 0.5rem);
    --score-card-info-additional-position-margin-right: var(
      --app-margin--s,
      0.5rem
    );
    --score-card-info-additional-value-margin-left: var(--app-margin--n, 1rem);

    display: block;
    font-family: var(--score-card-font-family);
    font-weight: var(--score-card-font-weign);
    font-size: var(--score-card-font-size);
    background-color: var(--score-card-bg);
    color: var(--score-card-text-color);
    border: var(--score-card-border);
    padding: var(--score-card-padding);
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  :host(:hover) {
    background-color: var(--score-card-hover-bg);
  }

  .info__basic {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--score-card-gap);
  }

  .info__basic .position {
    text-align: left;
  }

  .info__basic .key {
    flex-grow: 1;
    text-align: left;
  }

  .info__basic .value {
    text-align: right;
  }

  .info__additional {
    margin-top: var(--score-card-info-additional-margin-top);
  }

  .info__additional div {
    display: flex;
    align-items: center;
    margin-bottom: var(--score-card-info-additional-margin-bottom);
  }

  .info__additional .position {
    margin-right: var(--score-card-info-additional-position-margin-right);
  }

  .info__additional .key {
    flex-grow: 1;
  }

  .info__additional .value {
    margin-left: var(--score-card-info-additional-value-margin-left);
  }
`;
