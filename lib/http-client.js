const fetch = require('node-fetch')

const getRequestOptions = (method, body) => {
  const headers = { 'Content-Type': 'application/json' }
  if (method === 'GET') {
    return { method, headers }
  }
  return { method, body: JSON.stringify(body), headers }
}

module.exports = {
  async requestAPI (url, method, body = {}) {
    try {
      const response = await fetch(url, getRequestOptions(method, body))
      const data = await response.json()
      return data
    } catch (error) {
      return error
    }
  }
}
