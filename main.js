const numbers = [
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

const readBigNumber = [
  '',
  ' nghìn ',
  ' triệu ',
  ' tỷ ',
  ' nghìn tỷ ',
  ' triệu tỷ',
]
function readThreeNumbers(baso) {
  let hundred
  let ten
  let unit
  let result = ''
  hundred = parseInt(baso / 100)
  ten = parseInt((baso % 100) / 10)
  unit = baso % 10
  if (hundred == 0 && ten == 0 && unit == 0) return ''
  if (hundred != 0) {
    result += numbers[hundred] + ' trăm '
    if (ten == 0 && unit != 0) result += 'linh '
  }
  if (ten != 0 && ten != 1) {
    result += numbers[ten] + ' mươi '
    if (ten == 0 && unit != 0) result = result + 'linh '
  }
  if (ten == 1) result += 'mười '
  switch (unit) {
    case 1:
      if (ten != 0 && ten != 1) {
        result += 'mốt'
      } else {
        result += numbers[unit]
      }
      break
    case 5:
      if (ten == 0) {
        result += numbers[unit]
      } else {
        result += 'lăm '
      }
      break
    default:
      if (unit != 0) {
        result += numbers[unit]
      }
      break
  }
  return result
}

function readAllNumber(number) {
  let lan = 0
  let i = 0
  let so = 0
  let result = ''
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
    tmp = readThreeNumbers(ViTri[i])
    result += tmp
    if (ViTri[i] > 0) result += readBigNumber[i]
  }
  console.log(ViTri)
  result = result.substring(0, 1).toUpperCase() + result.substring(1)
  return result
}

function readNumber2Word(input) {
  return readAllNumber(convertNum(input))
}

function convertNum(input) {
  let s = input.split('')
  s.forEach((element) => {
    if (s[0].includes(0)) {
      s.shift()
    }
  })

  s = s.join('')
  return +s
}
console.log(readNumber2Word('1000303'))
// console.log(typeof !Number(0))
module.exports = readNumber2Word
