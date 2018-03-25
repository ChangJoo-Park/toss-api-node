const { requestAPI } = require('./http-client')
const ENDPOINT = require('./endpoints')

module.exports = class Toss {
  constructor (options) {
    const { apiKey } = options

    this.apiKey = apiKey
  }

  makePayment (required, options) {
    const body = this.makeRequestBody(required, options)
    return requestAPI(ENDPOINT.MAKE, 'POST', body)
  }

  approvePayment (required, options = {}) {
    const body = this.makeRequestBody(required, options)
    return requestAPI(ENDPOINT.APPROVE, 'POST', body)
  }

  cancelPayment (required, options = {}) {
    const body = this.makeRequestBody(required, options)
    return requestAPI(ENDPOINT.CANCEL, 'POST', body)
  }

  refundPayment (required, options) {
    const body = this.makeRequestBody(required, options)
    return requestAPI(ENDPOINT.REFUND, 'POST', body)
  }

  getStatus (required, options) {
    const body = this.makeRequestBody(required, options)
    return requestAPI(ENDPOINT.STATUS, 'POST', body)
  }

  getRefundDetails (required, options) {
    const body = this.makeRequestBody(required, options)
    const refundNo = required.refundNo || ''
    const URL = ENDPOINT.REFUND_DETAILS.replace('{REFUND}', refundNo)
    const API_APPENDED_URL = URL + `?apiKey=${this.apiKey}`
    return requestAPI(API_APPENDED_URL, 'GET')
  }

  doEscrow (required) {
    const body = this.makeRequestBody(required)
    return requestAPI(ENDPOINT.ESCROW, 'POST', body)
  }

  makeRequestBody (required = {}, options = {}) {
    return {
      apiKey: this.apiKey,
      ...required,
      ...options
    }
  }
}
