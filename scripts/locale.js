const axios = require('axios')
const sha256 = require('crypto-js/sha256')
const CryptoJS = require('crypto-js')
const fs = require('fs')

const translate = async (content) => {
  const appKey = 'appKey'
  const key = 'key'
  const salt = (new Date()).getTime()
  const curtime = Math.round(new Date().getTime() / 1000)
  const query = content.length >= 20 ? content.slice(0, 10) + content.length.toString() + content.slice(-10) : content
  const str1 = appKey + query + salt + curtime + key
  const sign = sha256(str1).toString(CryptoJS.enc.Hex)
  const from = 'zh-CHS'
  const to = 'en'
  const res = await axios.get('https://openapi.youdao.com/api', {
    params: {
      q: content,
      appKey: appKey,
      salt: salt,
      from: from,
      to: to,
      sign: sign,
      signType: 'v3',
      curtime: curtime
    }
  })
  return res.data.translation[0]
}

const trans = async (obj) => {
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object') {
      await trans(value)
    } else if (typeof value === 'string') {
      const res = await translate(value)
      obj[key] = res
      console.log(res + ' ' + value)
    }
  }
  return obj
}

trans({})
  .then(res => {
    console.log(res)
    fs.writeFileSync('./foo.json', JSON.stringify(res))
  })

