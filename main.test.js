const { expect } = require('@jest/globals')
const main = require('./main')

test('Test đọc số', () => {
  expect(main('1000')).toMatch(/Một nghìn/),
    expect(main('1000000')).toMatch(/Một triệu/),
    expect(main('101000')).toMatch(/Một trăm linh một/),
    expect(main('0')).toMatch(/Không/),
    expect(main('109202349394')).toMatch(
      /Một trăm linh chín tỷ hai trăm linh hai triệu ba trăm bốn mươi chín nghìn ba trăm chín mươi bốn/
    ),
    expect(main('1234567890')).toMatch(
      /Một tỷ hai trăm ba mươi bốn triệu năm trăm sáu mươi bảy nghìn tám trăm chín mươi/
    ),
    expect(main('101')).toMatch(/Một trăm linh một/),
    expect(main('tetx')).toMatch(/Không phải số/),
    expect(main('9999999999999999999999999')).toMatch(/Số quá lớn!/),
    expect(main('-2738')).toMatch(/Số âm!/),
    expect(main('null')).toMatch(/Không phải số/),
    expect(main('0000')).toMatch(/Không/),
    expect(main('000238238')).toMatch(
      /Hai trăm ba mươi tám nghìn hai trăm ba mươi tám/
    )
})
