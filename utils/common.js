const path = require('path')

function createError(message) {
  throw new Error(message)
}

function getFullPath(...args) {
  return path.join(process.cwd(), ...args)
}

module.exports = {
  createError,
  getFullPath,
}

