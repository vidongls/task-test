function readNumber2Word(input) {
  return readNum.doc(convertNum(input)).trim().replace(/  /g, ' ')
}

function convertNum(input) {
  if (input.length === 0 || input === ' ') {
    return 'not num'
  } else {
    let s = input.split('')
    s.forEach((element) => {
      if (s[0].includes(0)) {
        s.shift()
      }
    })
    s = s.join('')
    return +s
  }
}

module.exports = readNumber2Word
const readNum = (function () {
  const t = [
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
    ],
    r = function (r, n) {
      var o = '',
        a = Math.floor(r / 10),
        e = r % 10
      return (
        a > 1
          ? ((o = ' ' + t[a] + ' mươi'), 1 == e && (o += ' mốt'))
          : 1 == a
          ? ((o = ' mười'), 1 == e && (o += ' một'))
          : n && e > 0 && (o = ' linh'),
        5 == e && a >= 1
          ? (o += ' lăm')
          : 4 == e && a >= 1
          ? (o += ' tư')
          : (e > 1 || (1 == e && 0 == a)) && (o += ' ' + t[e]),
        o
      )
    },
    n = function (n, o) {
      var a = '',
        e = Math.floor(n / 100),
        n = n % 100
      return (
        o || e > 0
          ? ((a = ' ' + t[e] + ' trăm'), (a += r(n, !0)))
          : (a = r(n, !1)),
        a
      )
    },
    o = function (t, r) {
      var o = '',
        a = Math.floor(t / 1e6),
        t = t % 1e6
      a > 0 && ((o = n(a, r) + ' triệu'), (r = !0))
      var e = Math.floor(t / 1e3),
        t = t % 1e3
      return (
        e > 0 && ((o += n(e, r) + ' nghìn'), (r = !0)),
        t > 0 && (o += n(t, r)),
        o
      )
    }
  return {
    doc: function (r) {
      if (0 == r) return t[0].substring(0, 1).toUpperCase() + t[0].substring(1)
      if (!Number(r)) return 'Không phải số'
      if (r < 0) return 'Số âm!'
      var n = '',
        a = ''
      do
        (ty = r % 1e9),
          (r = Math.floor(r / 1e9)),
          (n = r > 0 ? o(ty, !0) + a + n : o(ty, !1) + a + n),
          (a = ' tỷ')
      while (r > 0)
      // n =
      return n.trim().substring(0, 1).toUpperCase() + n.substring(2)
    },
  }
})()
console.log(readNumber2Word('023329329'))
