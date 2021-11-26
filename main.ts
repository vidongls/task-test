const languages = {
  vi: require('./lang/vi.json'),
  en: require('./lang/en.json'),
}
exports.languages = languages

const NUMERALS = languages.en.WORD_NUMBERS
const WORD_NUMBERS = languages.vi.WORD_NUMBERS

convertToText.defaults = {
  lang: 'vi',
}

// console.log(convertToText.defaults)

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

function convertEnglish(n: number): string {
  if (n < 0) {
    return `minus ${convertEnglish(-n)}`
  } else if (n === 0) {
    return 'zero'
  } else {
    let result = ''
    for (const numeral of NUMERALS) {
      if (n >= numeral.value) {
        if (n < 100) {
          result += numeral.str
          n -= numeral.value
          if (n > 0) result += '-'
        } else {
          const times = Math.floor(n / numeral.value)
          result += `${convertEnglish(times)} ${numeral.str}`
          n -= numeral.value * times
          if (n > 0) result += ' and '
        }
      }
    }
    return result.charAt(0).toUpperCase() + result.slice(1)
  }
}

function convertVietnamese(no: number) {
  if (no === 0)
    return (
      WORD_NUMBERS[0].trim().charAt(0).toUpperCase() + WORD_NUMBERS[0].slice(1)
    )
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
  return text.trim().charAt(0).toUpperCase() + text.slice(2)
}
interface opt {
  lang: string
}
// const options = {
//   lang: 'vi',
// }

function convertToText(n: string, options?: opt): string {
  options = options || convertToText.defaults
  // options = options.until()
  if (n.length === 0 || n === ' ') {
    return !(options.lang === 'en') ? 'Không phải số' : 'Not a number'
  } else {
    return !(options.lang === 'en') ? convertVietnamese(+n) : convertEnglish(+n)
  }
}
module.exports = convertToText
console.log(convertToText('1001', { lang: 'en' }))
