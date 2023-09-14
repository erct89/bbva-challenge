import { html, fixture, expect } from '@open-wc/testing';
import '../../src/pages/scores-page.js';
import '../../src/components/scores-list.js';
import '../../src/components/score-card.js';

describe('ScoresPage', () => {
  let scoresPage;

  beforeEach(async () => {
    scoresPage = await fixture(html`<scores-page></scores-page>`);
  });

  it('renders two score lists', () => {
    const scoreLists = scoresPage.shadowRoot.querySelectorAll('score-list');
    expect(scoreLists).to.have.lengthOf(2);
  });

  it('renders correct header titles and empty messages', () => {
    const scoreLists = scoresPage.shadowRoot.querySelectorAll('score-list');
    const userScoreList = scoreLists[0];
    const globalScoreList = scoreLists[1];

    expect(userScoreList.headerTitle).to.equal('My Hight Scores');
    expect(globalScoreList.headerTitle).to.equal('Global Hight Scores');

    expect(userScoreList.emptyMessage).to.equal('Yeah!! You are the first!!');
    expect(globalScoreList.emptyMessage).to.equal('Yeah!! You are the first!!');
  });

  it('renders user scores correctly', async () => {
    const userScores = [
      { name: 'User1', score: 100 },
      { name: 'User2', score: 90 },
    ];

    scoresPage.userScores = userScores;
    await scoresPage.updateComplete;

    const userScoreList = scoresPage.shadowRoot.querySelector('score-list');
    const userScoreListItems =
      userScoreList.shadowRoot.querySelectorAll('score-card');

    expect(userScoreListItems).to.have.lengthOf(userScores.length);
    expect(userScoreListItems[0].userName).to.equal(userScores[0].name);
    expect(userScoreListItems[0].score).to.equal(userScores[0].score);
    expect(userScoreListItems[1].userName).to.equal(userScores[1].name);
    expect(userScoreListItems[1].score).to.equal(userScores[1].score);
  });

  it('renders global scores correctly', async () => {
    const globalScores = [
      { name: 'User3', score: 80 },
      { name: 'User4', score: 70 },
    ];

    scoresPage.scores = globalScores;
    await scoresPage.updateComplete;

    const globalScoreList =
      scoresPage.shadowRoot.querySelectorAll('score-list')[1];
    const globalScoreListItems =
      globalScoreList.shadowRoot.querySelectorAll('score-card');

    expect(globalScoreListItems).to.have.lengthOf(globalScores.length);
    expect(globalScoreListItems[0].userName).to.equal(globalScores[0].name);
    expect(globalScoreListItems[0].score).to.equal(globalScores[0].score);
    expect(globalScoreListItems[1].userName).to.equal(globalScores[1].name);
    expect(globalScoreListItems[1].score).to.equal(globalScores[1].score);
  });
});
