const chuso = [
  ' không ',
  'một',
  'hai',
  'ba',
  'bốn',
  'năm',
  'sáu',
  'bảy',
  'tám',
  'chín',
]

const solon = ['', ' nghìn ', ' triệu ', ' tỷ ', ' nghìn tỷ ', ' triệu tỷ']
function DocSo3ChuSo(baso) {
  let tram
  let chuc
  let donvi
  let KetQua = ''
  tram = parseInt(baso / 100)
  chuc = parseInt((baso % 100) / 10)
  donvi = baso % 10
  if (tram == 0 && chuc == 0 && donvi == 0) return ''
  if (tram != 0) {
    KetQua += chuso[tram] + ' trăm '
    if (chuc == 0 && donvi != 0) KetQua += 'linh '
  }
  if (chuc != 0 && chuc != 1) {
    KetQua += chuso[chuc] + ' mươi '
    if (chuc == 0 && donvi != 0) KetQua = KetQua + 'linh '
  }
  if (chuc == 1) KetQua += 'mười '
  switch (donvi) {
    case 1:
      if (chuc != 0 && chuc != 1) {
        KetQua += 'mốt'
      } else {
        KetQua += chuso[donvi]
      }
      break
    case 5:
      if (chuc == 0) {
        KetQua += chuso[donvi]
      } else {
        KetQua += 'lăm '
      }
      break
    default:
      if (donvi != 0) {
        KetQua += chuso[donvi]
      }
      break
  }
  return KetQua
}

function DocSo(number) {
  let lan = 0
  let i = 0
  let so = 0
  let KetQua = ''
  let tmp = ''
  let ViTri = []
  if (!Number(number) && number !== 0) return 'Không phải số!'

  if (number < 0) return 'Số âm!'
  if (number === 0) return 'Không'
  if (number > 0) {
    so = number
  } else {
    so = -number
  }
  if (number > 999999999999999) {
    //number = 0;
    return 'Số quá lớn!'
  }
  ViTri[5] = Math.floor(so / 1000000000000000)
  if (isNaN(ViTri[5])) ViTri[5] = '0'
  so = so - parseFloat(ViTri[5].toString()) * 1000000000000000
  ViTri[4] = Math.floor(so / 1000000000000)
  if (isNaN(ViTri[4])) ViTri[4] = '0'
  so = so - parseFloat(ViTri[4].toString()) * 1000000000000
  ViTri[3] = Math.floor(so / 1000000000)
  if (isNaN(ViTri[3])) ViTri[3] = '0'
  so = so - parseFloat(ViTri[3].toString()) * 1000000000
  ViTri[2] = parseInt(so / 1000000)
  if (isNaN(ViTri[2])) ViTri[2] = '0'
  ViTri[1] = parseInt((so % 1000000) / 1000)
  if (isNaN(ViTri[1])) ViTri[1] = '0'
  ViTri[0] = parseInt(so % 1000)
  if (isNaN(ViTri[0])) ViTri[0] = '0'
  if (ViTri[5] > 0) {
    lan = 5
  } else if (ViTri[4] > 0) {
    lan = 4
  } else if (ViTri[3] > 0) {
    lan = 3
  } else if (ViTri[2] > 0) {
    lan = 2
  } else if (ViTri[1] > 0) {
    lan = 1
  } else {
    lan = 0
  }
  for (i = lan; i >= 0; i--) {
    tmp = DocSo3ChuSo(ViTri[i])
    KetQua += tmp
    if (ViTri[i] > 0) KetQua += solon[i]
  }
  KetQua = KetQua.substring(0, 1).toUpperCase() + KetQua.substring(1)
  return KetQua
}

function main(input) {
  return DocSo(checknumb(input))
}

function checknumb(input) {
  let s = input.split('')
  s.forEach((element) => {
    if (s[0].includes(0)) {
      s.shift()
    }
  })

  s = s.join('')
  return +s
}
console.log(main('100000'))
// console.log(typeof !Number(0))
module.exports = main
