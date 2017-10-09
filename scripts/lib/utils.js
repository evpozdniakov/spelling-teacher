/* eslint global-require: "off" */

export function getRandomHash(length = 10) {
  const md5 = require('md5').default
  const now = new Date()
  const hash = md5(now)

  return hash.substr(0, length)
}
