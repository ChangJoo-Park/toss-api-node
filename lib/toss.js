const { requestAPI } = require('./http-client')
const ENDPOINT = require('./endpoints')

module.exports = class Toss {
  constructor (options) {
    const { apiKey } = options

    this.apiKey = apiKey
  }
  /**
   * 결제 건을 생성합니다.
   * 결제 생성 완료 후, 구매자의 승인을 얻어 완료처리하는 방법은 [문서](https://tossdev.github.io/gettingstarted.html#overview-3)를 참고하세요.
   * @param {Object} required : 결제 생성 시 필수로 요구되는 파라미터
   * - apiKey{String} : 가맹점 key
   * - orderNo{String} : 가맹점의 상품 주문번호, *주문번호는 50자 이내여야 하고, '숫자, 영문자, _, -'만 사용할 수 있습니다.*
   * - amount{Number(정수형)} : 결제 금액
   * - productDesc{String} : 상품 설명 *상품 설명은 공백으로만 설정할 수 없고, 백슬래시(\)와 따옴표(",')를 포함할 수 없으며 총 255자 이내여야 합니다.*
   * - autoExecute{boolean} : 자동 승인 여부 결정, 기본값 false
   *   - true : 구매자 인증 완료 시, 바로 결제 완료 처리  (true로 설정하면 반드시 'resultCallback' 값을 설정하고 '결제 완료' callback을 받았을 때만 구매 완료 처리해야합니다)
   *   - false : 구매자 인증 완료 후 가맹점의 최종 승인 시 결제 완료 처리  ('결제 승인 API'를 통해 최종 승인합니다)
   * - retUrl{String} : 결제 완료 후 연결할 웹페이지의 URL (결제 최종 승인 및 완료 처리할 페이지)
   *
   * @param {Object} options : 결제 생성시 추가적으로 지정할 내용
   * - amountTaxable{Number(정수형)} : 결제 금액 중 과세금액 (복합과세)
   * - amountTaxFree{Number(정수형)} : 결제 금액 중 비과세금액 (복합과세)
   * - amountVat{Number(정수형)} : 결제 금액 중 부가세 (복합과세)
   * - amountServiceFee{Number(정수형)} : 결제 금액 중 봉사료 (복합과세)
   * - expiredTime{DateTime} : 결제 만료 기한 (기본값 1시간, 10분~24시간 설정 가능) 형식 : 1970-01-01 00:00:00
   * - resultCallback{String} : autoExecute가 true이면 필수
   * - escrow{boolean} : 에스크로 결제 여부 (기본값 false)
   * - cashReceipt{boolean} : 현금영수증 발급 가능 여부 (기본값 true)
   * - checkoutType{String} :결제창 타입을 선택합니다. (앱/웹) 지문인증을 지원하려면 'app' 또는 'both'를 선택하세요. (기본값 web)
   *   - **Y** : 인증된 기기에서는 ARS 인증 생략
   *   - **N** : 인증 여부와 관계없이 ARS 인증 제공
   * - arsAuthSkippable{String(1)} : 인증된 기기에서 다시 결제할 때 ARS 인증 생략 여부를 설정합니다. (기본값 'Y')
   * - userPhone{String} : 구매자가 결제 시 이용할 휴대전화번호 지정 (지정 시 구매자가 번호를 변경할 수 없으므로 전화번호 정보가 정확할 때만 이용하십시오)

   * - partnerId{String} : 가맹점 서비스의 User ID  (본 parameter를 통해 User ID를 전송하면 재결제 시 전화번호 입력 없이 사용자를 식별하여 결제 과정이 더 간단해집니다)
   * - metadata{String} : 결제와 연관된 추가 데이터
   */
  makePayment (required, options) {
    return requestAPI(ENDPOINT.MAKE, 'POST', this.makeRequestBody(required, options))
  }

  /**
   * 구매자 인증 완료 상태(PAY_APPROVED)의 결제 건을 최종 승인하여 결제를 완료 처리합니다.
   * @param {Object} required : 결제 생성 시 필수로 요구되는 파라미터
   * - apiKey{String} : 가맹점 key
   * - payToken{String} : Toss 결제 토큰
   * @param {Object} options : 결제 생성시 추가적으로 지정할 내용
   * - amount{Number(정수형)} : 결제 금액 (입력하는 경우, 구매자가 승인한 결제 금액과 이 값이 일치할 경우에만 승인 처리)
   * - orderNo{String} : 가맹점의 상품 주문번호  (입력하는 경우, 구매자가 승인한 주문번호와 이 값이 일치할 경우에만 승인 처리)
   */
  approvePayment (required, options = {}) {
    return requestAPI(ENDPOINT.APPROVE, 'POST', this.makeRequestBody(required, options))
  }

  /**
   * 결제 대기 중인 결제 건을 취소합니다. (결제가 완료되어 구매자의 계좌에서 출금된 상태에서는 취소할 수 없으며 환불 처리해야 합니다)
   * @param {Object} required : 결제 생성 시 필수로 요구되는 파라미터
   * - apiKey{String} : 가맹점 key
   * - payToken{String} : Toss 결제 토큰
   * @param {Object} options : 결제 생성시 추가적으로 지정할 내용
   * - reason({String[50]}) :취소 사유
   */
  cancelPayment (required, options = {}) {
    return requestAPI(ENDPOINT.CANCEL, 'POST', this.makeRequestBody(required, options))
  }

  /**
   * 결제 완료 건의 결제 금액 중 일부 또는 전부를 구매자에게 돌려줍니다.
   * @param {Object} required : 결제 생성 시 필수로 요구되는 파라미터
   * - apiKey{String} : 가맹점 key
   * - payToken{String} : Toss 결제 토큰
   * @param {Object} options : 결제 생성시 추가적으로 지정할 내용
   * - refundNo{String} : 환불 번호.  환불 상태 확인 시 필요. 미입력 시 자동 생성되며 환불 완료 응답에서 확인 가능
   * - reason{String[50]} : 환불 사유
   * - amount{Number(정수형)} : 환불할 금액 미입력시 환불할 결제건의 남은 전액을 환불 처리
   * - amountTaxable{Number(정수형)} : 환불할 금액 중 과세금액 결제 생성 시 복합과세 설정한 경우에만 입력 가능
   * - amountTaxFree{Number(정수형)} : 환불할 금액 중 비과세금액  결제 생성 시 복합과세 설정한 경우에만 입력 가능
   * - amountVat{Number(정수형)} : 환불할 금액 중 부가세 결제 생성 시 복합과세 설정한 경우에만 입력 가능
   * - amountServiceFee{Number(정수형)} : 환불할 금액 중 봉사료 결제 생성 시 복합과세 설정한 경우에만 입력 가능
   */
  refundPayment (required, options) {
    return requestAPI(ENDPOINT.REFUND, 'POST', this.makeRequestBody(required, options))
  }

  /**
   * 생성된 결제의 현재 상태를 조회합니다.
   * @param {Object} required : 결제 생성 시 필수로 요구되는 파라미터. payToken과 orderNo 중 payToken이 우선순위 높음
   * - apiKey{String} : 가맹점 key
   * - payToken{String} : Toss 결제 토큰
   * - orderNo{String} : 가맹점 주문번호
   */
  getStatus (required) {
    return requestAPI(ENDPOINT.STATUS, 'POST', this.makeRequestBody(required))
  }

  /**
   * 요청하신 환불 건의 현재 상태를 조회합니다. (요청 건별 조회)
   * @param {Object} required : 결제 생성 시 필수로 요구되는 파라미터
   * - apiKey{String} : 가맹점 key
   */
  getRefundDetails (required, options) {
    const body = this.makeRequestBody(required, options)
    const URL = ENDPOINT.REFUND_DETAILS.replace('{REFUND}', body.refundNo)
    const API_APPENDED_URL = URL + `?apiKey=${this.apiKey}`
    return requestAPI(API_APPENDED_URL, 'GET')
  }

  /**
   * 에스크로 결제를 완료하고 대금을 정산받기 위해서는 '배송 등록'이 필요합니다.
   * 또, 구매자가 대금 지급을 거부하여 결제가 '구매자 지급 거부' 상태가 된 경우,
   * '구매확정 재요청'을 통해 거부 상태를 해제할 수 있습니다.
   *
   * 본 API를 통해 '배송 등록'과 '구매확정 재요청'을 처리할 수 있습니다.
   * - '배송등록 대기 중' 상태에서 호출 시 : '배송 등록' 됨
   * - 구매자 지급 거부 상태에서 호출 시 : '구매확정 재요청' 됨
   * 더 자세한 내용은 '토스 결제 시작하기 > 에스크로 결제 진행' [문서](https://tossdev.github.io/gettingstarted.html#escrow)를 참고하세요.
   * @param {Object} required : 결제 생성 시 필수로 요구되는 파라미터
   */
  doEscrow (required) {
    return requestAPI(ENDPOINT.ESCROW, 'POST', this.makeRequestBody(required))
  }

  /**
   * API 요청에 필요한 Body 데이터를 만듭니다.
   * @param {Object} required : 결제 생성 시 필수로 요구되는 파라미터
   * @param {Object} options : 결제 생성시 추가적으로 지정할 내용
   */
  makeRequestBody (required = {}, options = {}) {
    return {
      apiKey: this.apiKey,
      ...required,
      ...options
    }
  }
}
