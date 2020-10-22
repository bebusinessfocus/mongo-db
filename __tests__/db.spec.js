const mongoose = require('mongoose');
const { withDbConnect } = require('..');

describe('withDbConnect', () => {
  it('Should throw Invalid connection string', async () => {
    // Tests should use Jest‘s exception helpers.
    // Use "expect(() => yourFunction()).toThrow()" for synchronous tests,
    // or "await expect(yourFunction()).rejects.toThrow()" for async testseslintjest/no-try-expect
    await expect(withDbConnect('http://0.0.0.0:27017')).rejects.toThrow();
  });
  it('Should connect to localhost', async () => {
    const db = await withDbConnect();
    await mongoose.connection.close();
    expect(db).toBeDefined();
  });
});
