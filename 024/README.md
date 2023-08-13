# 모임 안내 페이지 \_ 230813~4

- 작업일자: 8월 13일(저녁)~ 14일(새벽)
- 내용:
  - 간단한 모임 관련 안내 페이지
  - 사은품 추첨 이벤트 등을 통해 모임 참여를 독려
  - 모임 ID를 통해 firestore DB의 collection 특정
- HTML + CSS + JavaScript

## 작업 내용

- 애니메이션(Rottie), MVP.css, 아이콘(font-awesome)
- uuid에 따라 meetup page 구분
- 기능A: 기념품 랜덤 추첨
  - 이름 사이 \*표시
  - 모달창, 각 추첨 확률 표시
- 기능B: 메시지 작성 및 삭제
  - 삭제 기능(로컬의 임시id 사용), 개선 필요

## DB: Firestore

- 모임 정보
- 익명 메시지 리스트
- 참여자 리스트

```tsx
/**
 * 모임 Meetup
 * @typedef {object} Meetup
 * @property {string} id - 모임 ID
 * @property {string} title - 모임 이름
 * @property {string} description
 * @property {string} place
 * @property {object} link {web: string, map: string}
 * @property {number} createdAt
 * @property {Message[]} messages
 * @property {Guest[]} guest
 */

/**
 * 메시지 Message
 * @typedef {object} Message
 * @property {string} id - 메시지 작성자의 ID
 * @property {string} name - 메시지 작성자의 이름
 * @property {number} createdAt - 메시지 작성 시간
 * @property {string} message - 실제 메시지 내용
 */

/**
 * 참여자 Geust
 * @typedef {object} Guest
 * @property {string} id - 참여자의 ID
 * @property {string} name - 참여자의 이름
 * @property {number} createdAt - 참여자 작성 시간
 * @property {number} prize - 당첨 여부
 */
```
