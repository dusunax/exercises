# PRD — 상식 퀴즈 게임 (034)

## 개요

바닐라 HTML/CSS/JS 단일 페이지 앱. 빌드 없이 `index.html` 브라우저 실행.

## 화면 흐름

```
홈 화면 → 카테고리 선택 → 퀴즈 진행 (10문제) → 결과 화면 → 전체 랭킹
```

## 기능 명세

**홈 화면**
- 게임 타이틀
- 카테고리 4개 카드 선택 (한국사 / 과학 / 지리 / 예술과 문화)
- 각 카드에 이전 최고점 표시 (없으면 `—`)

**퀴즈 화면**
- 상단: 카테고리명 · 진행률 바 · `문제 N / 10`
- 문제 텍스트
- 4지선다 버튼
- 선택 즉시 피드백: 정답(초록) / 오답(빨강) + 정답 강조
- 오답 시 정답 설명 한 줄 표시
- `다음 문제` 버튼 (피드백 확인 후 진행)

**결과 화면**
- 카테고리별 점수 (`N / 10`)
- 정답률에 따른 등급 메시지
- `다른 카테고리 도전` / `다시 하기` 버튼

**랭킹**
- `localStorage` 저장
- 카테고리별 상위 5개 기록 (점수 · 날짜)
- 홈에서 접근 가능한 랭킹 버튼

## 데이터 구조

```js
// questions.js
const QUESTIONS = {
  korean_history: [ // 10개
    {
      q: "질문",
      options: ["①", "②", "③", "④"],
      answer: 0,      // 정답 index
      explanation: "해설"
    }
  ],
  science: [...],
  geography: [...],
  arts_culture: [...]
}
```

## 파일 구조

```
034/
  index.html
  style.css
  script.js       # 게임 로직, 상태 관리, 렌더링
  questions.js    # 40문제 데이터
```

---

## 구현 프롬프트

### Step 1 — 문제 데이터 + HTML 뼈대

```
034/ 디렉토리를 만들고 상식 퀴즈 게임의 기반을 구축해줘.

1. questions.js: 4개 카테고리(korean_history, science, geography, arts_culture)에 각 10문제씩, 총 40문제를 작성해줘.
   - 각 문제는 { q, options: [4개], answer: 정답index, explanation } 형태
   - 실제 정답이 맞는 한국어 문제로 작성

2. index.html: 아래 세 화면을 div로 구분해서 만들어줘 (한 번에 하나만 표시).
   - #screen-home: 타이틀 + 카테고리 4개 카드 + 랭킹 버튼
   - #screen-quiz: 진행률 바 + 문제 + 4지선다 버튼 4개 + 해설 영역 + 다음 버튼
   - #screen-result: 점수 + 등급 메시지 + 액션 버튼들

3. style.css: 깔끔한 카드 기반 레이아웃, 모바일 대응(max-width: 480px 중앙 정렬).
   정답/오답 색상 클래스(.correct, .wrong)만 정의해두고 JS에서 토글.
```

### Step 2 — 게임 로직

```
034/script.js를 작성해줘. questions.js를 import해서 쓰고, index.html의 세 화면을 제어하는 게임 로직을 구현해줘.

state 객체로 상태를 관리해줘:
  { category, questions, currentIndex, score, selectedAnswer }

구현할 함수:
- showHome() / showQuiz() / showResult()
- startCategory(category): 해당 카테고리 문제 배열 가져와서 퀴즈 시작
- renderQuestion(): 현재 문제와 4개 보기 렌더링
- selectAnswer(index): 선택 즉시 정답/오답 피드백 (버튼 색상), 해설 표시, 다음 버튼 활성화
- nextQuestion(): 다음 문제로 이동 또는 결과 화면으로
- showResult(): 점수, 정답률에 따른 등급(10점 만점, A/B/C/D) 표시

모든 화면 전환은 CSS display 토글로 처리.
```

### Step 3 — 랭킹 + 마무리

```
034/ 프로젝트에 랭킹 시스템과 UI 마무리를 해줘.

1. localStorage 랭킹 (script.js에 추가):
   - saveScore(category, score): 카테고리별 점수 저장, 상위 5개만 유지
   - loadRanking(category): 저장된 기록 불러오기
   - 결과 화면에 "신기록!" 표시 (해당 카테고리 최고점 갱신 시)

2. 랭킹 모달 (index.html + style.css):
   - 홈의 랭킹 버튼 클릭 시 오버레이 모달
   - 탭으로 카테고리 전환
   - 기록 없으면 "아직 기록 없음" 표시

3. 진행률 바: 문제 넘길 때마다 width % 애니메이션 전환
4. 브라우저에서 index.html 열어서 전체 플로우(홈→퀴즈→결과→랭킹)가 정상 동작하는지 확인해줘.
```
