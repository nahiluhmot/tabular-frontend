import Tabular from 'tabular';
import { expect } from 'chai';

describe('Tabular', () => {
  describe('.initialize', () => {
    const instance = Tabular.initialize();

    it('returns a new instance of Tabular', () => {
      expect(instance).to.be.an.instanceof(Tabular);
    });
  });
});
