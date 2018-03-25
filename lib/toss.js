const { requestAPI } = require('./http-client')
const ENDPOINT = require('./endpoints')

module.exports = class Toss {
  constructor (options) {
    const { apiKey } = options

    this.apiKey = apiKey
  }

  makePayment (required, options) {
    return requestAPI(ENDPOINT.MAKE, 'POST', this.makeRequestBody(required, options))
  }

  approvePayment (required, options = {}) {
    return requestAPI(ENDPOINT.APPROVE, 'POST', this.makeRequestBody(required, options))
  }

  cancelPayment (required, options = {}) {
    return requestAPI(ENDPOINT.CANCEL, 'POST', this.makeRequestBody(required, options))
  }

  refundPayment (required, options) {
    return requestAPI(ENDPOINT.REFUND, 'POST', this.makeRequestBody(required, options))
  }

  getStatus (required, options) {
    return requestAPI(ENDPOINT.STATUS, 'POST', this.makeRequestBody(required, options))
  }

  getRefundDetails (required, options) {
    const body = this.makeRequestBody(required, options)
    const URL = ENDPOINT.REFUND_DETAILS.replace('{REFUND}', required.refundNo)
    const API_APPENDED_URL = URL + `?apiKey=${this.apiKey}`
    return requestAPI(API_APPENDED_URL, 'GET')
  }

  doEscrow (required) {
    return requestAPI(ENDPOINT.ESCROW, 'POST', this.makeRequestBody(required))
  }

  makeRequestBody (required = {}, options = {}) {
    return {
      apiKey: this.apiKey,
      ...required,
      ...options
    }
  }
}
