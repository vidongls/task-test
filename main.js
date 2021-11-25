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
  let index = []
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
  index[5] = Math.floor(so / 1000000000000000)
  if (isNaN(index[5])) index[5] = '0'
  so = so - parseFloat(index[5].toString()) * 1000000000000000
  index[4] = Math.floor(so / 1000000000000)
  if (isNaN(index[4])) index[4] = '0'
  so = so - parseFloat(index[4].toString()) * 1000000000000
  index[3] = Math.floor(so / 1000000000)
  if (isNaN(index[3])) index[3] = '0'
  so = so - parseFloat(index[3].toString()) * 1000000000
  index[2] = parseInt(so / 1000000)
  if (isNaN(index[2])) index[2] = '0'
  index[1] = parseInt((so % 1000000) / 1000)
  if (isNaN(index[1])) index[1] = '0'
  index[0] = parseInt(so % 1000)
  if (isNaN(index[0])) index[0] = '0'
  if (index[5] > 0) {
    lan = 5
  } else if (index[4] > 0) {
    lan = 4
  } else if (index[3] > 0) {
    lan = 3
  } else if (index[2] > 0) {
    lan = 2
  } else if (index[1] > 0) {
    lan = 1
  } else {
    lan = 0
  }
  for (i = lan; i >= 0; i--) {
    tmp = readThreeNumbers(index[i])
    result += tmp
    if (index[i] > 0) result += readBigNumber[i]
  }
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
