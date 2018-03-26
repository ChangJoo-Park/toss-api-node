const BASE_URL = 'https://toss.im/tosspay/api/v1'

module.exports = {
  MAKE: `${BASE_URL}/payments`, // 결제 생성
  APPROVE: `${BASE_URL}/execute`, // 결제 승인
  CANCEL: `${BASE_URL}/cancel`, // 결제 취소
  REFUND: `${BASE_URL}/refunds`, // 결제 환불
  REFUND_DETAILS: `${BASE_URL}/refunds/{REFUND}`, // 환불 상세
  STATUS: `${BASE_URL}/status`, // 결제 상태 확인
  ESCROW: `${BASE_URL}/escrow` // 에스크로 결제 진행
}
