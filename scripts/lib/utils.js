/* eslint global-require: "off", no-console: "off" */

export function getRandomHash(length = 10) {
  const md5 = require('md5')
  const now = new Date()
  const hash = md5(now)

  return hash.substr(0, length)
}

export function logError(err) {
  console.error(err)
}
