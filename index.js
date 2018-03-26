const tossAPI = require('./lib/toss')
const endPoints = require('./lib/endpoints')
const paymentStatus = require('./lib/payment-status')

console.log(tossAPI)

module.exports = {
  Toss: tossAPI.Toss,
  ENDPOINTS: endPoints,
  PAYMENT_STATUS: paymentStatus
}
