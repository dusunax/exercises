# export-report

`034/teacher_report.html`을 읽어 CSV 또는 PDF 파일로 내보낸다.

## 입력
- `$ARGUMENTS` : 출력 형식 (`csv | pdf`, 선택, 기본값: `csv`)
  - 예: `csv` → `teacher_report.csv` 생성
  - 예: `pdf` → `teacher_report_guide.md` 안내 생성 (브라우저 인쇄 방식)

## 데이터 파일
- `034/teacher_report.html` (입력 — 반드시 먼저 읽는다)
- `034/teacher_report.csv` (CSV 출력)
- `034/teacher_report_print.html` (PDF용 인쇄 최적화 HTML 출력)

## 실행 규칙

### 공통 — 파일 읽기
`teacher_report.html`을 읽는다.
- 파일이 없으면 즉시 중단하고 "먼저 `/create-report`를 실행하세요" 안내.
- 학생 데이터 테이블(`<table>`)을 파싱해 행 데이터를 추출한다.

---

### CSV 출력 (`csv`)

1. HTML 테이블에서 헤더 행과 데이터 행을 추출한다.
2. 다음 컬럼 구조로 CSV를 생성한다:
   ```
   이름,여행,음식,일상,미술/예술,대표점수,등급
   홍길동,95,88,90,95,92.0,A
   ```
3. 파일을 `034/teacher_report.csv`로 저장한다.
4. 완료 보고:
   ```
   ✓ CSV 내보내기 완료
   출력 파일 : 034/teacher_report.csv
   총 행 수  : N행 (헤더 포함)
   ```

---

### PDF 출력 (`pdf`)

Claude Code 환경에서는 직접 PDF를 생성할 수 없으므로 다음을 수행한다:

1. `teacher_report.html`에 인쇄 최적화 스타일을 추가한 `teacher_report_print.html`을 생성한다:
   - `@media print { body { font-size: 11pt; } }` 포함
   - 페이지 나누기(`page-break-inside: avoid`) 적용
   - 헤더/푸터에 리포트 제목과 페이지 번호 표시
2. PDF 저장 안내를 출력한다:
   ```
   ✓ 인쇄용 HTML 생성 완료: 034/teacher_report_print.html

   PDF로 저장하는 방법:
   1. teacher_report_print.html 을 브라우저에서 열기
   2. Cmd+P (Mac) 또는 Ctrl+P (Windows)
   3. 대상: "PDF로 저장" 선택
   4. 저장
   ```

---

## teacher-dashboard.md 업데이트

이 명령 실행 후 `teacher-dashboard.md`의 명령어 목록에
`export-report`가 없으면 자동으로 항목을 추가한다:

```markdown
| `/export-report [csv|pdf]` | 리포트를 CSV 또는 PDF로 내보내기 |
```

## 규칙
- `teacher_report.html`을 읽지 않고 임의로 데이터를 생성하지 않는다.
- CSV 값에 쉼표가 포함된 경우 큰따옴표로 감싼다.
- `-` 값은 CSV에서 빈 문자열로 처리한다.
