# CLAUDE.md — 034 상식 퀴즈 게임

This file extends the root CLAUDE.md with guidance specific to the 034 quiz project.

## Project overview

Vanilla JS + HTML quiz game. No build step — open `index.html` in a browser.

## File roles

| File | Role |
|---|---|
| `questions.js` | 40문제 데이터 (전역 `QUESTIONS` 배열) |
| `script.js` | 게임 로직 및 상태 관리 |
| `index.html` | 3개 화면 (`#screen-home`, `#screen-quiz`, `#screen-result`) |
| `style.css` | 레이아웃 및 피드백 색상 클래스 |
| `PRD.md` | 기획서 및 3단계 구현 프롬프트 |
| `QUIZ_GUIDELINES.md` | 문제 검증 체크리스트 |

## Question data structure

```js
{
  id: Number,
  category: "한국사" | "과학" | "지리" | "예술과 문화",
  difficulty: "easy" | "medium" | "hard",
  question: String,
  options: [String, String, String, String],  // 4지선다
  correctAnswer: Number,                       // 0-indexed
  explanation: String
}
```

카테고리별 10문제씩, 총 40문제. 순서: 여행 → 음식 → 일상 → 미술/예술.

## State structure

```js
{
  questions: [],        // QUESTIONS 배열 복사본
  currentIndex: 0,
  score: 0,
  selectedAnswer: null,
  answered: false,
  categoryScores: { "한국사": 0, "과학": 0, "지리": 0, "예술과 문화": 0 }
}
```

## Key functions (script.js)

- `initGame()` — 상태 초기화 후 퀴즈 시작
- `loadQuestion()` — 현재 인덱스 문제 렌더링
- `handleAnswer(i)` — 선택 처리, 정답/오답 판정
- `showFeedback(isCorrect, q)` — 즉시 피드백 및 해설 표시
- `nextQuestion()` — 다음 문제 또는 `endGame()` 호출
- `endGame()` — 결과 화면 렌더링

## Quiz question rules

문제 추가·수정 시 `QUIZ_GUIDELINES.md` 체크리스트를 반드시 적용한다.
