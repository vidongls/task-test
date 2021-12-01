const { expect } = require('@jest/globals');
const number2word = require('./main');

test('Test đọc số', () => {
  expect(number2word('001000')).toMatch(/Một nghìn/),
    expect(number2word('1000000')).toMatch(/Một triệu/),
    expect(number2word('1010001')).toMatch(
      /Một triệu không trăm mười nghìn không trăm linh một/
    ),
    expect(number2word('0')).toMatch(/Không/),
    expect(number2word('109202349394')).toMatch(
      /Một trăm linh chín tỷ hai trăm linh hai triệu ba trăm bốn mươi chín nghìn ba trăm chín mươi bốn/
    ),
    expect(number2word('1234567890')).toMatch(
      /Một tỷ hai trăm ba mươi bốn triệu năm trăm sáu mươi bảy nghìn tám trăm chín mươi/
    ),
    expect(number2word('101')).toMatch(/Một trăm linh một/),
    expect(number2word('tetx')).toMatch(/Không hợp lệ/),
    expect(number2word('999999999999999')).toMatch(
      /Chín trăm chín mươi chín nghìn chín trăm chín mươi chín tỷ chín trăm chín mươi chín triệu chín trăm chín mươi chín nghìn chín trăm chín mươi chín/
    ),
    expect(number2word('99999999999999999999999')).toMatch(/Số quá lớn/),
    expect(number2word('-2738')).toMatch(/Số âm!/),
    expect(number2word('')).toMatch(/Không hợp lệ/),
    expect(number2word('0000')).toMatch(/Không/),
    expect(number2word('000238238')).toMatch(
      /Hai trăm ba mươi tám nghìn hai trăm ba mươi tám/
    ),
    expect(number2word('               ', { lang: 'vi' })).toMatch(
      /Không hợp lệ/
    ),
    expect(number2word('    fdgfd-=           ', { lang: 'vi' })).toMatch(
      /Không hợp lệ/
    );
  expect(number2word('34738k-==', { lang: 'vi' })).toMatch(/Không hợp lệ/);
});
