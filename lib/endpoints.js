const BASE_URL = 'https://toss.im/tosspay/api/v1'

module.exports = {
  MAKE: `${BASE_URL}/payments`,
  APPROVE: `${BASE_URL}/execute`,
  CANCEL: `${BASE_URL}/cancel`,
  REFUND: `${BASE_URL}/refunds`,
  REFUND_DETAILS: `${BASE_URL}/refunds/{REFUND}`,
  STATUS: `${BASE_URL}/status`,
  ESCROW: `${BASE_URL}/escrow`,
}