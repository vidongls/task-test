const { expect } = require('@jest/globals');
const number2word = require('./main.ts');

test('Test đọc số', () => {
  expect(number2word('001', { lang: 'en' })).toMatch(/One/),
    expect(number2word('1001', { lang: 'en' })).toMatch(/One thousand and one/),
    expect(number2word('', { lang: 'en' })).toMatch(/Invalid/),
    expect(number2word('23423-=s', { lang: 'en' })).toMatch(/Invalid/),
    expect(number2word('23423-=s', { lang: 'en' })).toMatch(/Invalid/),
    expect(number2word('               ', { lang: 'en' })).toMatch(/Invalid/);
});
