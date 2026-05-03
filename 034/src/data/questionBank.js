const QUESTIONS = [
  // ── 여행 ────────────────────────────────────────────────────────────────────
  {
    id: 1, category: "여행", difficulty: "easy",
    question: "에펠탑이 위치한 도시는?",
    options: ["런던", "베를린", "파리", "로마"],
    correctAnswer: 2,
    explanation: "에펠탑은 프랑스 파리에 있으며, 1889년 만국박람회를 위해 건설되었습니다."
  },
  {
    id: 2, category: "여행", difficulty: "easy",
    question: "타지마할이 위치한 나라는?",
    options: ["파키스탄", "인도", "이란", "아랍에미리트"],
    correctAnswer: 1,
    explanation: "타지마할은 인도 아그라에 있는 무굴 제국 시대의 묘지 건축물입니다."
  },
  {
    id: 3, category: "여행", difficulty: "medium",
    question: "국토 면적 기준 세계에서 가장 작은 나라는?",
    options: ["모나코", "산마리노", "리히텐슈타인", "바티칸"],
    correctAnswer: 3,
    explanation: "바티칸은 면적 약 0.44km²로 세계에서 가장 작은 독립 국가입니다."
  },
  {
    id: 4, category: "여행", difficulty: "easy",
    question: "자유의 여신상이 있는 도시는?",
    options: ["워싱턴 D.C.", "보스턴", "뉴욕", "시카고"],
    correctAnswer: 2,
    explanation: "자유의 여신상은 미국 뉴욕항 리버티섬에 위치하며, 1886년 프랑스에서 선물한 것입니다."
  },
  {
    id: 5, category: "여행", difficulty: "easy",
    question: "이탈리아에서 '물의 도시'로 불리는 곳은?",
    options: ["밀라노", "피렌체", "나폴리", "베네치아"],
    correctAnswer: 3,
    explanation: "베네치아(Venice)는 운하 위에 건설된 도시로 '물의 도시'라 불립니다."
  },
  {
    id: 6, category: "여행", difficulty: "medium",
    question: "아마존 열대우림이 가장 넓게 분포하는 나라는?",
    options: ["콜롬비아", "페루", "브라질", "베네수엘라"],
    correctAnswer: 2,
    explanation: "아마존 열대우림의 약 60%가 브라질 영토 내에 위치합니다."
  },
  {
    id: 7, category: "여행", difficulty: "easy",
    question: "콜로세움이 있는 도시는?",
    options: ["아테네", "로마", "카이로", "이스탄불"],
    correctAnswer: 1,
    explanation: "콜로세움은 이탈리아 로마에 있는 고대 원형 경기장으로, 서기 80년에 완공되었습니다."
  },
  {
    id: 8, category: "여행", difficulty: "medium",
    question: "제주도의 유네스코 세계자연유산으로 등재된 것은?",
    options: ["성산일출봉 단독", "한라산 단독", "제주 화산섬과 용암동굴계", "마라도와 가파도"],
    correctAnswer: 2,
    explanation: "2007년 '제주 화산섬과 용암동굴계'가 유네스코 세계자연유산으로 등재되었습니다."
  },
  {
    id: 9, category: "여행", difficulty: "medium",
    question: "사파리 여행지로 가장 유명한 아프리카 국가가 아닌 것은?",
    options: ["케냐", "탄자니아", "남아프리카공화국", "이집트"],
    correctAnswer: 3,
    explanation: "이집트는 피라미드 등 역사 유적으로 유명하며, 대표적인 사파리 여행지는 케냐·탄자니아·남아공입니다."
  },
  {
    id: 10, category: "여행", difficulty: "hard",
    question: "해안선 길이 기준 세계에서 가장 긴 나라는?",
    options: ["러시아", "노르웨이", "캐나다", "호주"],
    correctAnswer: 2,
    explanation: "캐나다는 약 202,080km의 해안선을 보유해 세계에서 해안선이 가장 긴 나라입니다."
  },

  // ── 음식 ────────────────────────────────────────────────────────────────────
  {
    id: 11, category: "음식", difficulty: "easy",
    question: "커피의 원산지로 알려진 나라는?",
    options: ["브라질", "콜롬비아", "에티오피아", "베트남"],
    correctAnswer: 2,
    explanation: "커피는 에티오피아 카파 지역에서 처음 발견된 것으로 알려져 있습니다."
  },
  {
    id: 12, category: "음식", difficulty: "medium",
    question: "서양 요리의 세계 3대 진미에 속하지 않는 것은?",
    options: ["푸아그라", "트뤼플", "캐비아", "랍스터"],
    correctAnswer: 3,
    explanation: "세계 3대 진미는 푸아그라(거위 간), 트뤼플(송로버섯), 캐비아(철갑상어 알)입니다."
  },
  {
    id: 13, category: "음식", difficulty: "easy",
    question: "초콜릿의 원료인 카카오의 원산지 대륙은?",
    options: ["아프리카", "아시아", "중남미", "유럽"],
    correctAnswer: 2,
    explanation: "카카오는 중남미(멕시코·과테말라 일대)가 원산지이며, 마야·아즈텍 문명이 먼저 사용했습니다."
  },
  {
    id: 14, category: "음식", difficulty: "medium",
    question: "파스타의 주재료는?",
    options: ["쌀가루", "감자전분", "듀럼밀 세몰리나", "옥수숫가루"],
    correctAnswer: 2,
    explanation: "파스타는 듀럼밀(경질밀)을 갈아 만든 세몰리나 가루로 만듭니다."
  },
  {
    id: 15, category: "음식", difficulty: "easy",
    question: "된장의 주재료는?",
    options: ["쌀", "콩(대두)", "보리", "팥"],
    correctAnswer: 1,
    explanation: "된장은 콩(대두)을 발효시켜 만든 한국의 전통 발효 식품입니다."
  },
  {
    id: 16, category: "음식", difficulty: "medium",
    question: "다음 중 이탈리아 음식이 아닌 것은?",
    options: ["리조토", "파에야", "티라미수", "카르보나라"],
    correctAnswer: 1,
    explanation: "파에야(Paella)는 쌀에 해산물·고기를 넣어 만든 스페인 전통 요리입니다."
  },
  {
    id: 17, category: "음식", difficulty: "easy",
    question: "빵을 처음 만든 것으로 알려진 고대 문명은?",
    options: ["그리스", "로마", "메소포타미아", "이집트"],
    correctAnswer: 3,
    explanation: "고대 이집트인들이 기원전 4000년경 최초로 발효빵을 만들었다고 알려져 있습니다."
  },
  {
    id: 18, category: "음식", difficulty: "easy",
    question: "물 다음으로 세계에서 가장 많이 소비되는 음료는?",
    options: ["커피", "우유", "차(茶)", "맥주"],
    correctAnswer: 2,
    explanation: "차(茶, tea)는 물 다음으로 세계에서 가장 많이 소비되는 음료입니다."
  },
  {
    id: 19, category: "음식", difficulty: "medium",
    question: "김치 발효에 관여하는 주요 미생물은?",
    options: ["효모균", "대장균", "유산균(젖산균)", "곰팡이"],
    correctAnswer: 2,
    explanation: "김치 발효는 주로 유산균(젖산균)이 담당하며, 이 과정에서 유기산이 생성됩니다."
  },
  {
    id: 20, category: "음식", difficulty: "hard",
    question: "프랑스 요리에서 육수를 오래 끓여 졸인 소스의 기반을 무엇이라 하는가?",
    options: ["루(Roux)", "퐁(Fond)", "부케 가르니(Bouquet garni)", "미르푸아(Mirepoix)"],
    correctAnswer: 1,
    explanation: "퐁(Fond)은 뼈·채소를 오래 끓여 만든 육수로, 프랑스 요리 소스의 기반이 됩니다."
  },

  // ── 일상 ────────────────────────────────────────────────────────────────────
  {
    id: 21, category: "일상", difficulty: "easy",
    question: "성인의 정상 체온은?",
    options: ["35.5°C", "36.5°C", "37.5°C", "38.5°C"],
    correctAnswer: 1,
    explanation: "성인의 정상 체온은 약 36.5°C이며, 37.5°C 이상이면 발열로 봅니다."
  },
  {
    id: 22, category: "일상", difficulty: "easy",
    question: "꿈을 꾸는 수면 단계는?",
    options: ["NREM 1단계", "NREM 2단계", "NREM 3단계", "REM 수면"],
    correctAnswer: 3,
    explanation: "REM(Rapid Eye Movement) 수면 단계에서 눈이 빠르게 움직이며 꿈을 꿉니다."
  },
  {
    id: 23, category: "일상", difficulty: "medium",
    question: "사랑니를 제외한 성인 영구치의 개수는?",
    options: ["24개", "26개", "28개", "30개"],
    correctAnswer: 2,
    explanation: "사랑니(4개)를 제외한 성인 영구치는 28개이며, 사랑니 포함 시 최대 32개입니다."
  },
  {
    id: 24, category: "일상", difficulty: "easy",
    question: "성인 기준 하루 권장 수면 시간은?",
    options: ["5~6시간", "6~7시간", "7~9시간", "10~12시간"],
    correctAnswer: 2,
    explanation: "미국 국립수면재단 기준, 성인(18~64세)의 하루 권장 수면 시간은 7~9시간입니다."
  },
  {
    id: 25, category: "일상", difficulty: "easy",
    question: "성인 기준 하루 권장 물 섭취량은?",
    options: ["약 500mL", "약 1리터", "약 2리터", "약 4리터"],
    correctAnswer: 2,
    explanation: "성인의 하루 권장 수분 섭취량은 약 2리터(음식 포함 시 약 2.5~3리터)입니다."
  },
  {
    id: 26, category: "일상", difficulty: "easy",
    question: "ABO식 혈액형의 종류는 몇 가지인가?",
    options: ["2가지", "3가지", "4가지", "8가지"],
    correctAnswer: 2,
    explanation: "ABO식 혈액형은 A, B, O, AB의 4가지로 분류됩니다."
  },
  {
    id: 27, category: "일상", difficulty: "medium",
    question: "성인의 안정 시 평균 심박수는?",
    options: ["40~50회/분", "60~100회/분", "110~120회/분", "130~150회/분"],
    correctAnswer: 1,
    explanation: "성인의 안정 시 정상 심박수는 분당 60~100회이며, 평균은 약 72회입니다."
  },
  {
    id: 28, category: "일상", difficulty: "medium",
    question: "재활용 마크에서 페트(PET)병의 분류 번호는?",
    options: ["1번", "3번", "5번", "7번"],
    correctAnswer: 0,
    explanation: "플라스틱 재활용 분류 번호 1번은 PET(폴리에틸렌 테레프탈레이트)로 생수병·음료병에 사용됩니다."
  },
  {
    id: 29, category: "일상", difficulty: "hard",
    question: "사람의 한 손에 있는 뼈의 개수는?",
    options: ["19개", "23개", "27개", "31개"],
    correctAnswer: 2,
    explanation: "손 하나에는 손목뼈(8) + 손바닥뼈(5) + 손가락뼈(14) = 27개의 뼈가 있습니다."
  },
  {
    id: 30, category: "일상", difficulty: "medium",
    question: "WHO 기준 성인의 정상 혈압(수축기)은?",
    options: ["90mmHg 미만", "120mmHg 미만", "140mmHg 미만", "160mmHg 미만"],
    correctAnswer: 1,
    explanation: "WHO 기준 성인 정상 혈압은 수축기 120mmHg 미만, 이완기 80mmHg 미만입니다."
  },

  // ── 미술/예술 ────────────────────────────────────────────────────────────────
  {
    id: 31, category: "미술/예술", difficulty: "easy",
    question: "모나리자를 그린 화가는?",
    options: ["미켈란젤로", "라파엘로", "레오나르도 다빈치", "보티첼리"],
    correctAnswer: 2,
    explanation: "레오나르도 다빈치가 1503~1519년경 그린 모나리자는 세계에서 가장 유명한 그림입니다."
  },
  {
    id: 32, category: "미술/예술", difficulty: "easy",
    question: "'별이 빛나는 밤'을 그린 화가는?",
    options: ["폴 고갱", "클로드 모네", "빈센트 반 고흐", "폴 세잔"],
    correctAnswer: 2,
    explanation: "빈센트 반 고흐가 1889년 생레미 요양원에서 '별이 빛나는 밤'을 그렸습니다."
  },
  {
    id: 33, category: "미술/예술", difficulty: "medium",
    question: "'절규(The Scream)'를 그린 화가는?",
    options: ["에드가 드가", "에드바르 뭉크", "오귀스트 르누아르", "폴 고갱"],
    correctAnswer: 1,
    explanation: "노르웨이 화가 에드바르 뭉크가 1893년 그린 '절규'는 표현주의의 대표작입니다."
  },
  {
    id: 34, category: "미술/예술", difficulty: "medium",
    question: "피카소가 조르주 브라크와 함께 창시한 미술 사조는?",
    options: ["인상주의", "표현주의", "입체주의", "초현실주의"],
    correctAnswer: 2,
    explanation: "파블로 피카소와 조르주 브라크가 창시한 입체주의(큐비즘)는 여러 시점을 동시에 표현합니다."
  },
  {
    id: 35, category: "미술/예술", difficulty: "medium",
    question: "'키스(The Kiss)'를 그린 화가는?",
    options: ["살바도르 달리", "르네 마그리트", "구스타프 클림트", "에곤 실레"],
    correctAnswer: 2,
    explanation: "오스트리아 화가 구스타프 클림트가 1907~1908년 금박을 사용해 '키스'를 그렸습니다."
  },
  {
    id: 36, category: "미술/예술", difficulty: "easy",
    question: "인상주의의 대표 화가는?",
    options: ["클로드 모네", "렘브란트", "요하네스 페르메이르", "카라바조"],
    correctAnswer: 0,
    explanation: "클로드 모네는 인상주의의 대표 화가로, '수련' 연작으로 유명합니다."
  },
  {
    id: 37, category: "미술/예술", difficulty: "hard",
    question: "2017년 경매에서 약 4500억 원에 팔려 역대 최고가 기록을 세운 그림의 작가는?",
    options: ["파블로 피카소", "빈센트 반 고흐", "레오나르도 다빈치", "클로드 모네"],
    correctAnswer: 2,
    explanation: "레오나르도 다빈치의 '살바토르 문디'가 2017년 약 4억 5천만 달러에 낙찰되어 역대 최고가를 기록했습니다."
  },
  {
    id: 38, category: "미술/예술", difficulty: "medium",
    question: "살바도르 달리가 속한 미술 사조는?",
    options: ["인상주의", "입체주의", "표현주의", "초현실주의"],
    correctAnswer: 3,
    explanation: "살바도르 달리는 꿈과 무의식을 표현하는 초현실주의(Surrealism)의 대표 화가입니다."
  },
  {
    id: 39, category: "미술/예술", difficulty: "easy",
    question: "한국 조선 시대 민화에서 잡귀를 쫓는 상징으로 가장 자주 등장하는 동물은?",
    options: ["용", "봉황", "호랑이", "거북이"],
    correctAnswer: 2,
    explanation: "조선 민화에서 호랑이는 잡귀를 쫓는 수호신으로 자주 등장하며, 해학적으로 표현된 경우가 많습니다."
  },
  {
    id: 40, category: "미술/예술", difficulty: "medium",
    question: "르네상스 미술의 발원지는?",
    options: ["로마", "피렌체", "베네치아", "밀라노"],
    correctAnswer: 1,
    explanation: "르네상스는 14~15세기 이탈리아 피렌체에서 시작되었으며, 메디치 가문의 후원이 큰 역할을 했습니다."
  }
];
