const { expect } = require('@jest/globals')
const number2word = require('./main')

test('Test đọc số', () => {
  expect(number2word('001000')).toMatch(/Một nghìn/),
    expect(number2word('1000000')).toMatch(/Một triệu/),
    expect(number2word('1010001')).toMatch(
      /Một triệu không trăm mười nghìn không trăm linh một/
    ),
    expect(number2word('0')).toMatch(/Không/),
    expect(number2word('109202349394')).toMatch(
      /Một trăm linh chín tỷ hai trăm linh hai triệu ba trăm bốn mươi chín nghìn ba trăm chín mươi tư/
    ),
    expect(number2word('1234567890')).toMatch(
      /Một tỷ hai trăm ba mươi tư triệu năm trăm sáu mươi bảy nghìn tám trăm chín mươi/
    ),
    expect(number2word('101')).toMatch(/Một trăm linh một/),
    expect(number2word('tetx')).toMatch(/Không phải số/),
    expect(number2word('999999999999999999999999909999999999')).toMatch(
      /Một tỷ tỷ tỷ hai trăm tám mươi bảy triệu năm trăm năm mươi lăm nghìn không trăm bảy mươi hai tỷ không trăm mười bảy triệu chín trăm sáu mươi mốt nghìn chín trăm tám mươi tư/
    ),
    expect(number2word('-2738')).toMatch(/Số âm!/),
    expect(number2word('')).toMatch(/Không phải số/),
    expect(number2word('0000')).toMatch(/Không/),
    expect(number2word('000238238')).toMatch(
      /Hai trăm ba mươi tám nghìn hai trăm ba mươi tám/
    )
})
