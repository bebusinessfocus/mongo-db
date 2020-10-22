// const mongoose = require('mongoose');
// const { withDbConnect } = require('..');

const withDbConnect = require('../lib/db');

describe('withDbConnect', () => {
  it('Should throw Invalid connection string', async () => {
    // Tests should use Jest‘s exception helpers.
    // Use "expect(() => yourFunction()).toThrow()" for synchronous tests,
    // or "await expect(yourFunction()).rejects.toThrow()" for async testseslintjest/no-try-expect
    await expect(withDbConnect('http://0.0.0.0:27017')).rejects.toThrow();
  });
});
