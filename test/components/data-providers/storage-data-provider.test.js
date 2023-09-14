import { html, fixture, expect } from '@open-wc/testing';
import { StorageDataProvider } from '../../../src/components/data-providers/storage-data-provider.js';

describe('StorageDataProvider', () => {
  let storageDataProvider;

  beforeEach(async () => {
    storageDataProvider = await fixture(
      html`<storage-data-provider></storage-data-provider>`
    );
  });

  it('should return true if a user is logged in', () => {
    storageDataProvider.saveUser({ username: 'exampleUser' });

    const result = storageDataProvider.isLogin();

    expect(result).to.be.true;
  });

  it('should return false if no user is logged in', () => {
    localStorage.removeItem(`${storageDataProvider.host}.user`);

    const result = storageDataProvider.isLogin();

    expect(result).to.be.false;
  });

  it('should return false if user data is incomplete', () => {
    const result = storageDataProvider.isLogin();

    expect(result).to.be.false;
  });

  it('should set a user in local storage', () => {
    const user = { name: 'John' };
    storageDataProvider.saveUser(user);

    const savedUser = JSON.parse(
      localStorage.getItem(`${storageDataProvider.host}.user`)
    );
    expect(savedUser).to.deep.equal(user);
  });

  it('should get a user from local storage', () => {
    const user = { name: 'John' };
    localStorage.setItem(
      `${storageDataProvider.host}.user`,
      JSON.stringify(user)
    );

    const retrievedUser = storageDataProvider.getUser();
    expect(retrievedUser).to.deep.equal(user);
  });

  it('should register a user with config and scores', () => {
    const user = { name: 'John' };
    const config = { setting: 'value' };
    const score = 100;

    storageDataProvider.registerUser(user);
    storageDataProvider.registerConfig(user, config);
    storageDataProvider.registerScore(user, score);

    const retrievedUser = storageDataProvider.getUser();
    const retrievedConfig = storageDataProvider.getConfig(user);
    const retrievedScores = storageDataProvider.getScores(user);

    expect(retrievedUser).to.deep.equal(user);
    expect(retrievedConfig).to.deep.equal(config);
    expect(retrievedScores).to.deep.equal([score]);
  });

  it('should update and limit scores to 10', () => {
    const scores = [
      { score: 100 },
      { score: 50 },
      { score: 75 },
      { score: 80 },
      { score: 90 },
      { score: 70 },
      { score: 65 },
      { score: 110 },
      { score: 95 },
      { score: 60 },
      { score: 85 },
    ];
    const expectedResult = [
      { score: 110 },
      { score: 100 },
      { score: 95 },
      { score: 90 },
      { score: 85 },
      { score: 80 },
      { score: 75 },
      { score: 70 },
      { score: 65 },
      { score: 60 },
    ];

    const updatedScores = StorageDataProvider.updateScores(scores);

    expect(updatedScores).to.deep.equal(expectedResult);
    expect(updatedScores.length).to.equal(10);
  });
});
