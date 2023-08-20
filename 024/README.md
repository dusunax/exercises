# 모임 안내 페이지 \_ 230813~4, 230820

- 작업일자:
  - (1차) 8월 13일(저녁)~ 14일(새벽)
  - (2차) 8월 20일(오전, 밤)
- 작업 내용:
  - (1차) 
    - 간단한 모임 관련 안내 페이지
    - 사은품 추첨 이벤트 등을 통해 모임 참여를 독려
    - 모임 ID를 통해 firestore DB의 collection 특정
  - (2차)
    - select option aside 추가(모임에 해당하는 select option을 firestore DB에서 가져오도록 구현)
    - chart.js를 사용해 select 통계 
- HTML + CSS + JavaScript

#### index.html & error.html
<img width="200px" src="https://github.com/dusunax/exercises/assets/94776135/fb62216b-72d4-478d-8107-059f7598e46d" />
<img width="200px" src="https://github.com/dusunax/exercises/assets/94776135/0a11c61a-154a-4131-aeb0-5b13dc9c0838" />

#### meeting.html
<img width="600px" src="https://github.com/dusunax/exercises/assets/94776135/8ac857a6-8bf6-442a-9c9f-a4136abb8d40" />
<br />
<img width="240px" src="https://github.com/dusunax/exercises/assets/94776135/f0b9a4c9-f0f2-45a9-b546-5500b10baa9e" />

## 작업 내용

- 애니메이션(Rottie), MVP.css, 아이콘(font-awesome)
- uuid에 따라 meetup page 구분
- 기능A: `참여자` 패칭, 추가, 기념품 랜덤 추첨
  - 이름 사이 \*표시
  - 모달창, 각 추첨 확률 표시
- 기능B: `메시지` 패칭, 작성 및 삭제
  - 삭제 기능(로컬의 임시id 사용), 개선 필요
- 기능C: `선택 옵션` 출력 및 리스트 저장
  - option과 value 출력, 유저의 선택 리스트 저장 및 출력
  - 결과를 차트로 표기(chart.js)



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
 * 참여자 Guest
 * @typedef {object} Guest
 * @property {string} id - 참여자의 ID
 * @property {string} name - 참여자의 이름
 * @property {number} createdAt - 참여자 작성 시간
 * @property {number} prize - 당첨 여부
 */
```
