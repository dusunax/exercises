# 034 커스텀 커맨드 가이드

034 상식 퀴즈 프로젝트용 Claude Code 슬래시 커맨드 목록입니다.

---

## 실행 방법

커맨드 파일은 `.claude/commands/034/` 에 있으며, Claude Code가 `034:` 네임스페이스로 자동 인식한다.

```
/034:quiz-add 여행 medium
/034:teacher-dashboard
```

인수가 있는 커맨드는 커맨드명 뒤에 스페이스로 구분해 입력한다.

```
/034:quiz-validate 여행          ← 카테고리 지정
/034:quiz-range 31 40            ← 시작ID 종료ID
/034:teacher-input 홍길동 85 여행  ← 이름 점수 카테고리
/034:export-report csv           ← 출력 형식
```

---

## 퀴즈 데이터 관리

### `/quiz-add`
새 퀴즈 문항을 `src/data/questionBank.js`에 추가한다.

| 인수 | 설명 |
|---|---|
| `$1` | 카테고리 (`여행 \| 음식 \| 일상 \| 미술/예술`) |
| `$2` | 난이도 (`easy \| medium \| hard`) |

추가 후 자동으로 형식 검증 → 범위 분포 확인 순서로 후속 체크를 권고한다.

---

### `/quiz-validate [카테고리]`
퀴즈 문항의 **모호 표현**(`가장` / `최초` / `최대`)을 탐지하고, 기준 명시가 부족한 항목에 대해 수정 권고안을 제시한다.

- 인수 없음: 전체 문항 검사
- 카테고리명 지정: 해당 카테고리만 검사
- 발견 없으면 `PASS`, 있으면 `NEEDS_CLARIFICATION` + 보강 기준 제시

---

### `/quiz-check [카테고리]`
문항의 **구조 오류**, **정답 정확성**, **중복**, **정답 인덱스 편향**을 종합 검증한다.

- 필드 타입·범위·형식 검사 (id, category, difficulty, options, correctAnswer, explanation)
- `correctAnswer`와 `explanation` 내용 일치 확인
- 정답 인덱스 40% 초과 시 편향 경고
- 모든 항목 통과 시 `✓ 전체 PASS`

---

### `/quiz-stats [카테고리 | all]`
문제 데이터의 **통계**를 출력한다.

- 카테고리별 문항 수 및 목표(10문항) 달성률
- 난이도 분포 (easy / medium / hard)
- 정답 인덱스 분포 및 편향 경고

---

### `/quiz-range <시작ID> <종료ID>`
지정한 ID 구간의 문항을 대상으로 **난이도·정답 분포**를 확인한다.

- 범위 벗어난 ID 포함 시 경고
- 난이도 편중(70% 초과), 정답 인덱스 편중(50% 초과) 경고

---

### `/quiz-daily [카테고리 난이도]`
데이터 점검 및 문항 추가를 7단계로 순서 실행하는 **일일 루틴**.
각 단계 실패 시 즉시 중단하고 오류를 보고한다.

| 단계 | 내용 |
|---|---|
| 1 | 파일 구조 읽기 |
| 2 | 문제 개수·분포 확인 |
| 3 | 카테고리별 부족 분석 |
| 4 | 중복 체크 |
| 5 | 문제 추가·형식 검증 |
| 6 | 전체 데이터 백업 (`src/data/backup/`) |
| 7 | 실행 결과 보고 |

---

### `/quiz-leaderboard [카테고리 | analyze | reset <카테고리|all>]`
`localStorage`의 **순위 데이터**를 조회·분석·초기화한다.

| 서브커맨드 | 동작 |
|---|---|
| (없음) / `show` | 전체 카테고리 TOP 5 출력 |
| 카테고리명 | 해당 카테고리 순위만 출력 |
| `analyze` | 점수 분포·모드별 기록·활발한 카테고리 분석 |
| `reset <대상>` | 확인 후 순위 초기화 |

> localStorage는 브라우저 전용이므로 소스 구조 검증으로 대체 가능.

---

## 선생님 모드

학생 성적을 입력·비교·분석하고 HTML 리포트를 생성하는 기능 세트.
성적 데이터는 `034/teacher_scores.json`에 저장된다.

### 권장 실행 순서

```
teacher-input  →  teacher-compare  →  teacher-insights
→  create-report  →  export-report
```

또는 통합 커맨드 `teacher-dashboard`로 한 번에 실행.

---

### `/teacher-input <이름> <점수> [카테고리] [모드]`
학생 성적을 `teacher_scores.json`에 **입력·저장**한다.

```
예시:  /teacher-input 홍길동 85 여행 category
```

- 동일 학생 재입력 시 기존 기록에 추가 (중복 허용)
- 카테고리·모드 생략 시 각각 `전체` / `full` 기본값

---

### `/teacher-compare [카테고리 | 학생명...]`
학생들의 성적을 **순위표**로 비교하고 상대평가 등급을 표시한다.

| 등급 | 기준 |
|---|---|
| A | 상위 20% |
| B | 상위 21~40% |
| C | 상위 41~70% |
| D | 하위 30% |

- 인수 없음: 전체 비교
- 카테고리명: 해당 카테고리만
- 학생 이름 2명 이상: 지정 학생 간 1:1 비교

---

### `/teacher-insights [학생명 | 카테고리]`
학급의 **취약점·성장 추이**를 분석한다.

- 학급 평균·표준편차·점수 분포
- 카테고리별 학급 평균 → 취약 카테고리 탐지
- 학급 평균 대비 -10점 이하 학생 → 개인 취약 플래그
- 동일 카테고리 2회 이상 기록 시 ↑↓→ 성장 추이 표시

---

### `/create-report [제목]`
`teacher_scores.json`을 읽어 **HTML 성적 리포트**(`teacher_report.html`)를 생성한다.

- 034 퀴즈와 동일한 디자인 시스템 적용
  - 배경: `#07080f` + radial-gradient
  - 폰트: Fraunces / Space Mono / Outfit
  - 등급 색: A=`#34d399` / B=`#fbbf24` / C=`#a7b2d2` / D=`#f87171`
- 등급 분포 카드, 성적표, 카테고리 평균, 취약 학생 섹션 포함
- `@media print` 포함으로 인쇄 가능

---

### `/export-report [csv | pdf]`
`teacher_report.html`을 읽어 **CSV 또는 PDF**로 내보낸다.

| 인수 | 동작 |
|---|---|
| `csv` (기본) | `teacher_report.csv` 생성 |
| `pdf` | 인쇄용 `teacher_report_print.html` 생성 + 브라우저 인쇄 안내 |

> 반드시 `create-report` 실행 후 사용. HTML 파일이 없으면 즉시 중단.

---

### `/teacher-dashboard [full | report | analysis | status]`
선생님 모드 전체 파이프라인을 **한 번에 실행**하는 통합 커맨드.

| 모드 | 실행 단계 |
|---|---|
| `full` (기본) | 비교 → 인사이트 → 리포트 생성 → CSV 내보내기 |
| `report` | 리포트 생성 → CSV 내보내기만 |
| `analysis` | 비교 → 인사이트만 |
| `status` | 현재 데이터 현황 출력만 (파일 변경 없음) |

---

## 파일 구조 요약

```
.claude/commands/
└── 034/                       ← 커맨드 네임스페이스 (034:xxx 로 호출)
    │
    ├── 퀴즈 데이터 관리
    │   ├── quiz-add.md
    │   ├── quiz-validate.md
    │   ├── quiz-check.md
    │   ├── quiz-stats.md
    │   ├── quiz-range.md
    │   ├── quiz-leaderboard.md
    │   └── quiz-daily.md
    │
    └── 선생님 모드
        ├── teacher-input.md
        ├── teacher-compare.md
        ├── teacher-insights.md
        ├── create-report.md
        ├── export-report.md
        └── teacher-dashboard.md
```

## 데이터 파일 참조

| 파일 | 역할 |
|---|---|
| `034/src/data/questionBank.js` | 퀴즈 문항 원본 데이터 |
| `034/src/data/backup/` | `quiz-daily` 백업 저장 위치 |
| `034/teacher_scores.json` | 학생 성적 저장소 |
| `034/teacher_report.html` | 생성된 HTML 리포트 |
| `034/teacher_report.csv` | 내보낸 CSV |
| `034/teacher_report_print.html` | PDF용 인쇄 최적화 HTML |
