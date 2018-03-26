const shortId = require('shortid')

const Toss = require('../lib/toss')

const main = async () => {
  const toss = new Toss({
    apiKey: 'sk_test_apikey1234567890a'
  })
  const makePayment = async () => {
    const requiredInfo = {
      orderNo: shortId.generate(), // 상품 결제에 대한 유니크값
      amount: 35000,
      productDesc: '토스티셔츠',
      autoExecute: false,
      retUrl: 'http://naver.com'
    }
    const optionalInfo = {
      amountTaxable: 0,
      amountTaxFree: 0,
      amountVat: 0,
      amountServiceFee: 0,
      expiredTime: 0,
      resultCallback: 'http://naver.com',
      escrow: false,
      cashReceipt: true,
      checkoutType: 'both',
      arsAuthSkippable: 'Y',
      userPhone: '00000000000',
      partnerId: '',
      metadata: ''
    }
    try {
      const data = await toss.makePayment(requiredInfo, optionalInfo)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const approvePayment = async () => {
    const requiredInfo = {
      payToken: 'test_token1234567890a'
    }
    const options = {
      amount: -1,
      orderNo: ''
    }

    try {
      const data = await toss.approvePayment(requiredInfo, options)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const cancelPayment = async () => {
    try {
      const requiredInfo = {
        payToken: 'test_token1234567890a'
      }
      const options = {
        amount: -1,
        orderNo: ''
      }
      const data = await toss.cancelPayment(requiredInfo, options)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const refundPayment = async () => {
    try {
      const requiredInfo = {
        payToken: 'test_token1234567890a'
      }
      const options = {
        refundNo: '',
        reason: '',
        amount: -1,
        amountTaxable: -1,
        amountTaxFree: -1,
        amountVat: -1,
        amountServiceFee: -1
      }
      const data = await toss.refundPayment(requiredInfo, options)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const statusPayment = async () => {
    try {
      const requiredInfo = {
        payToken: 'test_token1234567890a',
        orderNo: '2015072012211'
      }
      const data = await toss.getStatus(requiredInfo)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const refundDetails = async () => {
    try {
      const requiredInfo = { refundNo: '7161b8e3-4b79-49d7-ab3c-3ae898aa073b' }
      const data = await toss.getRefundDetails(requiredInfo)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const makeEscrow = async () => {
    try {
      const requiredInfo = { payToken: 'test_token1234567890a' }
      const data = await toss.doEscrow(requiredInfo)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  // Testing Methods
  await makePayment()
  await approvePayment()
  await cancelPayment()
  await refundPayment()
  await statusPayment()
  await refundDetails()
  await makeEscrow()
}

main()
