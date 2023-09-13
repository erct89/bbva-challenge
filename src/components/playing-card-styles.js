import { css } from 'lit';

export default css`
  :host {
    --playing-card-front-font-size: var(--app-fsize--3xl);
    --playing-card-back-font-size: var(--app-fsize--3xl);
    --playing-card-bg: var(--app-bg--white);
    --playing-card-bg--success: var(--app-bg--success);
    --playing-card-bg--error: var(--app-bg--warning);
    --playing-card-borde: var(--app-size--one-px) solid var(--app-color--gray);
    --playing-card-bradius: var(--app-size--s);
    --playing-card-box-shadow: var(--app-size--one-px) var(--app-size--one-px)
      var(--app-size--one-px) var(--app-color--gray);
  }

  .card {
    width: 100%;
    height: 100%;
    background-color: var(--playing-card-bg);
    display: flex;
    justify-content: center;
    align-items: center;
    border: var(--playing-card-borde);
    border-radius: var(--playing-card-bradius);
    box-shadow: var(--playing-card-box-shadow);
    cursor: pointer;
    transition: transform 0.3s ease;
    transform-style: preserve-3d;
  }

  .card.flipped {
    transform: rotateY(180deg);
  }

  .card-front,
  .card-back {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    backface-visibility: hidden;
    position: absolute;
  }

  .card-front {
    font-size: var(--playing-card-front-font-size);
  }

  .card-back {
    font-size: var(--playing-card-back-font-size);
    transform: rotateY(180deg);
  }

  :host(.success) .card-front {
    background-color: var(--playing-card-bg--success);
  }

  :host(.error) .card-front {
    background-color: var(--playing-card-bg--error);
  }
`;
