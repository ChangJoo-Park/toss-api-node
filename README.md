# TOSS API for Node

## TOSS API

[TOSS 공식문서](https://tossdev.github.io/gettingstarted.html)를 보고 만들었습니다.

## 사용방법

```bash
npm install --save toss-node-api
```

```js
const TossAPI = require('toss-node-api')
const Toss = TossAPI.Toss

// 직접 발급받은 API 키를 사용하세요
const apiKey = 'sk_test_apikey1234567890a'
const tossObject = new Toss({ apiKey })
const requiredInfo = {} // 생략
const optionalInfo = {} // 생략

const main = async () => {
  try {
    const data = await tossObject.makePayment(requiredInfo, optionalInfo)
    console.log(data)
  } catch (e) {
    // 에러 핸들링
  }
}

main()
```

## 할 일

- [x] 엔드포인트 정의
- [x] 결제 생성
- [x] 결제 승인
- [x] 결제 취소
- [x] 환불
- [x] 환불 상태
- [x] 결제 상태
- [x] 에스크로
- [x] API 요청 HTTP Client
- [ ] Body 검증 룰 추가
- [x] 문서화
- [ ] ~dist 버전 빌드~
- [x] npm 배포
