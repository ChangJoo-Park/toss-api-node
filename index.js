const TossClass = require('./lib/toss')
const endPoints = require('./lib/endpoints')
const paymentStatus = require('./lib/payment-status')

module.exports = {
  Toss: TossClass,
  ENDPOINTS: endPoints,
  PAYMENT_STATUS: paymentStatus
}
