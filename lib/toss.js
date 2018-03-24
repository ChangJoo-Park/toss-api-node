const { requestAPI } = require('./http-client')
const ENDPOINT = require('./endpoints')

module.exports = class Toss {
  constructor (options) {
    const { apiKey } = options

    this.apiKey = apiKey
  }

  async makePayment (required, options) {
    const body = this.makeRequestBody(required, options)
    const result = await requestAPI(ENDPOINT.MAKE, 'POST', body)
    return result
  }

  async approvePayment (required, options = {}) {
    const body = this.makeRequestBody(required, options)
    const result = await requestAPI(ENDPOINT.APPROVE, 'POST', body)
    return result
  }

  async cancelPayment (required, options = {}) {
    const body = this.makeRequestBody(required, options)
    const result = await requestAPI(ENDPOINT.CANCEL, 'POST', body)
    return result
  }

  async refundPayment (required, options) {
    const body = this.makeRequestBody(required, options)
    const result = await requestAPI(ENDPOINT.REFUND, 'POST', body)
    return result
  }

  async getStatus (required, options) {
    const body = this.makeRequestBody(required, options)
    const result = await requestAPI(ENDPOINT.STATUS, 'POST', body)
    return result
  }

  async getRefundDetails (required, options) {
    const body = this.makeRequestBody(required, options)
    const refundNo = required.refundNo || ''
    const URL = ENDPOINT.REFUND_DETAILS.replace('{REFUND}', refundNo)
    const API_APPENDED_URL = URL + `?apiKey=${this.apiKey}`
    const result = await requestAPI(API_APPENDED_URL, 'GET')
    return result
  }

  async doEscrow (required) {
    const body = this.makeRequestBody(required)
    const result = await requestAPI(ENDPOINT.ESCROW, 'POST', body)
    return result
  }

  makeRequestBody (required = {}, options = {}) {
    return {
      apiKey: this.apiKey,
      ...required,
      ...options
    }
  }
}
