import { html, fixture, expect } from '@open-wc/testing';
import '../../src/components/scores-list.js';
import '../../src/components/score-card.js';

describe('ScoreList', () => {
  let scoreList;

  beforeEach(async () => {
    scoreList = await fixture(html`
      <score-list
        header-title="High Scores"
        empty-message="No scores available"
        .scores="${[
          {
            name: 'User1',
            score: 100,
            level: { label: 'Intermediate' },
            rounds: 3,
            cardsToFind: { value: 10 },
          },
          {
            name: 'User2',
            score: 150,
            level: { label: 'Advanced' },
            rounds: 4,
            cardsToFind: { value: 12 },
          },
        ]}"
      ></score-list>
    `);
  });

  it('renders a header title', () => {
    const header = scoreList.shadowRoot.querySelector('h4');
    expect(header).to.exist;
    expect(header.textContent).to.equal('High Scores');
  });

  it('renders score cards when there are scores', () => {
    const scoreCards = scoreList.shadowRoot.querySelectorAll('score-card');
    expect(scoreCards.length).to.equal(2);

    // Verifica que los nombres de usuario se representen correctamente.
    const usernames = Array.from(scoreCards).map(card => card.userName);
    expect(usernames).to.include('User1');
    expect(usernames).to.include('User2');

    // Verifica que la información adicional se represente correctamente.
    const additionalInfo = Array.from(scoreCards).map(
      card => card.additionalInformation
    );
    expect(additionalInfo).to.deep.equal([
      [
        { key: 'Level', value: 'Intermediate' },
        { key: 'Round', value: 3 },
        { key: 'Cards to Find', value: 10 },
      ],
      [
        { key: 'Level', value: 'Advanced' },
        { key: 'Round', value: 4 },
        { key: 'Cards to Find', value: 12 },
      ],
    ]);
  });

  it('renders an empty message when there are no scores', async () => {
    scoreList.scores = [];
    await scoreList.updateComplete;

    const emptyMessage = scoreList.shadowRoot.querySelector('p');
    expect(emptyMessage).to.exist;
    expect(emptyMessage.textContent).to.equal('No scores available');
  });
});
