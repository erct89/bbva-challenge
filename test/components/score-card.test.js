import { html, fixture, expect } from '@open-wc/testing';
import '../../src/components/score-card.js';

describe('ScoreCard', () => {
  let scoreCard;

  beforeEach(async () => {
    scoreCard = await fixture(html`
      <score-card
        user-name="User1"
        score="100"
        ranking-position="1"
        .additionalInformation="${[
          { key: 'Level', value: '5' },
          { key: 'Time', value: '30s' },
        ]}"
        show-info
      ></score-card>
    `);
  });

  it('renders basic user information and additional information when show-info is true', () => {
    const basicInfo = scoreCard.shadowRoot.querySelector('.info__basic');
    expect(basicInfo).to.exist;

    const additionalInfo =
      scoreCard.shadowRoot.querySelector('.info__additional');
    expect(additionalInfo).to.exist;
  });

  it('hides additional information when show-info is false', async () => {
    scoreCard.showInfo = false;
    await scoreCard.updateComplete;

    const additionalInfo =
      scoreCard.shadowRoot.querySelector('.info__additional');
    expect(additionalInfo).to.not.exist;
  });

  it('renders user position, name, and score', () => {
    const position = scoreCard.shadowRoot.querySelector('.position span');
    const name = scoreCard.shadowRoot.querySelector('.key span');
    const score = scoreCard.shadowRoot.querySelector('.value span');

    expect(position).to.exist;
    expect(name).to.exist;
    expect(score).to.exist;

    expect(position.textContent).to.equal('#1');
    expect(name.textContent).to.equal('User1');
    expect(score.textContent).to.equal('100');
  });

  it('renders additional information key-value pairs', () => {
    const additionalInfoItems = scoreCard.shadowRoot.querySelectorAll(
      '.info__additional .key span'
    );

    expect(additionalInfoItems.length).to.equal(2);
    expect(additionalInfoItems[0].textContent).to.equal('Level');
    expect(additionalInfoItems[1].textContent).to.equal('Time');
  });
});
