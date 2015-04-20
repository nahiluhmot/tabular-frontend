import Tabular from 'tabular';
import { expect } from 'chai';

describe('Tabular', () => {
  describe('.initialize', () => {
    const result = Tabular.initialize();

    it('returns true', () => {
      expect(result).to.eq(true);
    });
  });
});
