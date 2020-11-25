const capitalize = require('./capitalize');
test('returns the first letter capitalized', () => {
  expect(capitalize('john')).toBe('John');
  expect(capitalize('Brown')).toBe('Brown');
  expect(capitalize('god')).toBe('God');
});