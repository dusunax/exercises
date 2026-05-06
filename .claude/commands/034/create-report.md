# create-report

`teacher_scores.json`을 읽어 학생 성적 종합 리포트를 `teacher_report.html`로 생성한다.

## 입력
- `$ARGUMENTS` : 리포트 제목(선택). 비어 있으면 기본값 `034 퀴즈 성적 리포트` 사용.

## 데이터 파일
- `034/teacher_scores.json` (입력)
- `034/teacher_report.html` (출력)

## 등급 산정 — 상대평가 (상위 비율 기준)

전체 학생의 대표 점수(카테고리별 최고 점수의 평균)를 내림차순 정렬한 뒤 백분위를 계산한다.

| 조건 | 등급 |
|---|---|
| 상위 20% 이내 | **A** |
| 상위 21~40% | **B** |
| 상위 41~70% | **C** |
| 하위 30% (하위 1~30%) | **D** |

백분위 계산식:
```
백분위 = (해당 학생보다 낮은 점수의 학생 수) / (전체 학생 수 - 1) × 100
```
- 동점자는 같은 등급을 부여한다.
- 학생이 1명인 경우 A 등급을 부여한다.

## 리포트 구성

HTML 파일은 다음 섹션으로 구성한다:

1. **헤더** — 리포트 제목, 생성 일시, 총 학생 수
2. **등급 분포 요약** — A/B/C/D 등급별 학생 수 및 비율 (막대 시각화)
3. **학생별 성적표** — 이름, 카테고리별 최고 점수, 대표 점수, 등급
4. **카테고리별 학급 평균** — 4개 카테고리 평균 점수 비교
5. **취약 학생 목록** — D등급 또는 학급 평균 대비 -15점 이하 학생

## HTML 스타일 규칙

034 퀴즈 게임(`034/style.css`)과 동일한 디자인 시스템을 인라인 CSS로 재현한다.

### 폰트
`<head>`에 아래 Google Fonts 링크를 포함한다:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,900;1,9..144,400&family=Outfit:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
```

### CSS 변수 (`:root`)
```css
--accent:    #b3f542;
--accent-d:  #91cc32;
--correct:   #34d399;
--wrong:     #f87171;
--warn:      #fbbf24;
--bg:        #07080f;
--surface:   #11172a;
--surface-2: #1b2240;
--text:      #eef1ff;
--muted:     #a7b2d2;
--border:    #3c4570;
--radius:    6px;
--font-display: 'Fraunces', serif;
--font-mono:    'Space Mono', monospace;
--font-body:    'Outfit', sans-serif;
```

### body
```css
font-family: var(--font-body);
background:
  radial-gradient(ellipse at 15% 0%, rgba(179,245,66,.07) 0%, transparent 55%),
  radial-gradient(ellipse at 85% 100%, rgba(52,211,153,.04) 0%, transparent 55%),
  var(--bg);
color: var(--text);
min-height: 100vh;
padding: 40px 20px 80px;
```

### 등급 색상
| 등급 | 색상 변수 | 비고 |
|---|---|---|
| A | `var(--correct)` = `#34d399` | 초록 |
| B | `var(--warn)` = `#fbbf24` | 노랑 |
| C | `var(--muted)` = `#a7b2d2` | 회색 |
| D | `var(--wrong)` = `#f87171` | 빨강 |

### 카드 컴포넌트
모든 섹션 박스는 다음 스타일을 공통으로 사용한다:
```css
background: var(--surface);
border: 1px solid var(--border);
border-radius: var(--radius);
padding: 20px 24px;
margin-bottom: 12px;
```

### 헤더 영역
- 제목: `font-family: var(--font-display); font-size: 28px; font-weight: 900; font-style: italic; color: var(--accent)`
- 부제: `font-size: 11px; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em`

### 섹션 레이블
```css
font-size: 10px;
font-weight: 700;
color: var(--muted);
text-transform: uppercase;
letter-spacing: 0.1em;
margin-bottom: 14px;
```

### 학생 성적표 (테이블 대신 breakdown-row 패턴)
`border-collapse` 테이블 대신 034의 `.breakdown-row` 패턴을 사용한다:
```css
/* 헤더 행 */
display: grid;
grid-template-columns: 32px 1fr repeat(4, 64px) 72px 48px;
gap: 8px;
padding: 8px 4px;
font-size: 10px; font-weight: 700; color: var(--muted); text-transform: uppercase;

/* 데이터 행 */
display: grid;
grid-template-columns: 32px 1fr repeat(4, 64px) 72px 48px;
gap: 8px;
align-items: center;
padding: 12px 4px;
border-bottom: 1px solid var(--border);
font-size: 13px;
```
- 순위 숫자: `font-family: var(--font-mono); color: var(--muted)`
- 점수 셀: `font-family: var(--font-mono); font-weight: 700`
- 대표 점수: `color: var(--accent)`

### 등급 배지
```css
display: inline-block;
font-family: var(--font-mono);
font-size: 13px;
font-weight: 700;
padding: 3px 10px;
border-radius: 3px;
background: rgba(색상, 0.12);
border: 1px solid rgba(색상, 0.3);
color: <등급색>;
```

### 통계 카드 그리드 (등급 분포, 카테고리 평균)
```css
display: grid;
grid-template-columns: repeat(4, 1fr);
gap: 8px;
```
각 카드:
```css
background: var(--surface-2);
border: 1px solid var(--border);
border-radius: var(--radius);
padding: 16px 14px;
text-align: center;
```
값: `font-family: var(--font-mono); font-size: 28px; font-weight: 700; color: <등급색 or --accent>`
레이블: `font-size: 10px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.07em; margin-top: 6px`

### 취약 학생 목록
left border accent 패턴:
```css
border-left: 3px solid var(--wrong);
background: rgba(248,113,113,.05);
border-radius: var(--radius);
padding: 14px 16px 14px 18px;
margin-bottom: 8px;
```

### 인쇄 지원
```css
@media print {
  body { background: #fff; color: #000; padding: 20px; }
  [class*="card"], [class*="row"] { border-color: #ccc; }
  .no-print { display: none; }
}
```

### 필수 포함 태그
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## 실행 규칙

1. `teacher_scores.json`을 읽는다. 파일이 없으면 즉시 중단.
2. 각 학생의 대표 점수를 계산한다 (카테고리별 최고 점수 평균).
3. 상대평가 등급을 산정한다.
4. HTML을 생성해 `teacher_report.html`로 저장한다.
5. 완료 보고:

```
✓ 리포트 생성 완료
출력 파일 : 034/teacher_report.html
총 학생 수 : N명
등급 분포  : A N명 | B N명 | C N명 | D N명
```

## 규칙
- 기록이 없는 카테고리 칸은 `-`로 표시한다.
- 이전에 생성된 `teacher_report.html`이 있으면 덮어쓴다.
