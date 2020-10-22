describe('Check JS', () => {
  it('returns options', () => {
    const defaultOpts = {
      pool: true,
    };
    const opts = {
      pool: false,
      parser: 2,
    };
    const options = { ...defaultOpts, ...opts };
    expect(options.pool).toBeDefined();
    expect(options.pool).toBeFalsy();
    expect(options.parser).toBeDefined();
    expect(options.parser).toEqual(2);
  });
});
