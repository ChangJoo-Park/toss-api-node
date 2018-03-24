const fetch = require('node-fetch')

const ENDPOINT = require('./endpoints')

module.exports = class Toss {
  constructor (options) {
    const { apiKey } = options

    this.apiKey = apiKey
  }

  async makePayment (required, options) {
    const body = this.makeRequestBody(required, options)
    const result = await this.requestAPI(ENDPOINT.MAKE, 'POST', body)
    return result
  }

  async approvePayment (required, options = {}) {
    const body = this.makeRequestBody(required, options)
    const result = await this.requestAPI(ENDPOINT.APPROVE, 'POST', body)
    return result
  }

  async cancelPayment (required, options = {}) {
    const body = this.makeRequestBody(required, options)
    const result = await this.requestAPI(ENDPOINT.CANCEL, 'POST', body)
    return result
  }

  async refundPayment (required, options) {
    const body = this.makeRequestBody(required, options)
    const result = await this.requestAPI(ENDPOINT.REFUND, 'POST', body)
    return result
  }

  async getStatus (required, options) {
    const body = this.makeRequestBody(required, options)
    const result = await this.requestAPI(ENDPOINT.STATUS, 'POST', body)
    return result
  }

  async getRefundDetails (required, options) {
    const body = this.makeRequestBody(required, options)
    const refundNo = required.refundNo || ''
    const URL = ENDPOINT.REFUND_DETAILS.replace('{REFUND}', refundNo)
    const API_APPENDED_URL = URL + `?apiKey=${this.apiKey}`
    const result = await this.requestAPI(API_APPENDED_URL, 'GET')
    return result
  }

  async doEscrow (required) {
    const body = this.makeRequestBody(required)
    const result = await this.requestAPI(ENDPOINT.ESCROW, 'POST', body)
    return result
  }

  async requestAPI (url, method, body = {}) {
    try {
      const response = await fetch(url, this.getRequestOptions(method, body))
      const data = await response.json()
      return data
    } catch (error) {
      return error
    }
  }

  getRequestOptions (method, body) {
    const headers = { 'Content-Type': 'application/json' }
    if (method === 'GET') {
      return { method, headers }
    }
    return { method, body: JSON.stringify(body), headers }
  }

  makeRequestBody (required = {}, options = {}) {
    return {
      apiKey: this.apiKey,
      ...required,
      ...options
    }
  }
}
