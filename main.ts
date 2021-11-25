const NUMERALS = [
  { value: 1000000000000000000000, str: 'sextillion' },
  { value: 1000000000000000000, str: 'quintillion' },
  { value: 1000000000000000, str: 'quadrillion' },
  { value: 1000000000000, str: 'trillion' },
  { value: 1000000000, str: 'billion' },
  { value: 1000000, str: 'million' },
  { value: 1000, str: 'thousand' },
  { value: 100, str: 'hundred' },
  { value: 90, str: 'ninety' },
  { value: 80, str: 'eighty' },
  { value: 70, str: 'seventy' },
  { value: 60, str: 'sixty' },
  { value: 50, str: 'fifty' },
  { value: 40, str: 'forty' },
  { value: 30, str: 'thirty' },
  { value: 20, str: 'twenty' },
  { value: 19, str: 'nineteen' },
  { value: 18, str: 'eighteen' },
  { value: 17, str: 'seventeen' },
  { value: 16, str: 'sixteen' },
  { value: 15, str: 'fifteen' },
  { value: 14, str: 'fourteen' },
  { value: 13, str: 'thirteen' },
  { value: 12, str: 'twelve' },
  { value: 11, str: 'eleven' },
  { value: 10, str: 'ten' },
  { value: 9, str: 'nine' },
  { value: 8, str: 'eight' },
  { value: 7, str: 'seven' },
  { value: 6, str: 'six' },
  { value: 5, str: 'five' },
  { value: 4, str: 'four' },
  { value: 3, str: 'three' },
  { value: 2, str: 'two' },
  { value: 1, str: 'one' },
]

const WORD_NUMBERS = [
  'không',
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

function readDozen(no: number, isWhole: boolean) {
  let dozen = ''
  const quotient = Math.floor(no / 10)
  const remainder = no % 10
  if (quotient > 1) {
    dozen = ` ${WORD_NUMBERS[quotient]} mươi`
    if (remainder === 1) {
      dozen += ' mốt'
    }
  } else if (quotient === 1) {
    dozen = ' mười'
    if (remainder === 1) {
      dozen += ' một'
    }
  } else if (isWhole && remainder > 0) {
    dozen = ' linh'
  }
  if (remainder === 5 && quotient > 1) {
    dozen += ' lăm'
  } else if (remainder > 1 || (remainder === 1 && quotient === 0)) {
    dozen += ` ${WORD_NUMBERS[remainder]}`
  }
  return dozen
}

function readHundred(no: number, isWhole: boolean) {
  let text = ''
  const tram = Math.floor(no / 100)
  no = no % 100
  if (isWhole || tram > 0) {
    text = ` ${WORD_NUMBERS[tram]} trăm`
    text += readDozen(no, true)
  } else {
    text = readDozen(no, false)
  }
  return text
}

function readMillion(no: number, isWhole: boolean) {
  let text = ''
  const million = Math.floor(no / 1000000)
  no = no % 1000000
  if (million > 0) {
    text = `${readHundred(million, isWhole)} triệu`
    isWhole = true
  }
  const thousand = Math.floor(no / 1000)
  no = no % 1000
  if (thousand > 0) {
    text += `${readHundred(thousand, isWhole)} nghìn`
    isWhole = true
  }
  if (no > 0) {
    text += readHundred(no, isWhole)
  }
  return text
}

function convertVietnamese(no: number) {
  if (no === 0) return WORD_NUMBERS[0]
  if (!Number(no)) return 'Không phải số'
  if (no < 0) return 'Số âm!'
  let text = '',
    postFix = ''
  do {
    const billion = no % 1000000000
    no = Math.floor(no / 1000000000)
    if (no > 0) {
      text = readMillion(billion, true) + postFix + text
    } else {
      text = readMillion(billion, false) + postFix + text
    }
    postFix = ' tỷ'
  } while (no > 0)
  return text
}

function convertToText(n: string): string {
  //   const code = localStorage.getItem('i18nextLng')
  if (n.length === 0 || n === ' ') {
    return 'Không phải số'
  } else {
    let textName = convertVietnamese(+n).trim()
    return textName.substring(0, 1).toUpperCase() + textName.substring(1)
  }
}
module.exports = convertToText
console.log(convertToText('10001001'))
