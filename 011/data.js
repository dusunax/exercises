// coffee note
const data=[
    {
        item_no: 0,
        store: '스타벅스, 카페베네, 파리바게트',
        string: '가벼운 커피향과 블렌딩',
        country: '브라질',
        kind: '아라비카',
        place: '이파네마, 상파울루'
    },
    {
        item_no: 1,
        store: '이디야, 카페베네, 할리스',
        string: '풍부한 신맛과 부드러운 향미',
        country: '콜롬비아',
        kind: '-',
        place: '마니살레스, 아르메니아'
    },
    {
        item_no: 2,
        store: '',
        string: '',
        country: '',
        kind: '',
        place: ''
    },
    {
        item_no: 3,
        store: '',
        string: '',
        country: '',
        kind: '',
        place: ''
    },
    {
        item_no: 4,
        store: '',
        string: '',
        country: '',
        kind: '',
        place: ''
    },
];
const qna=[
    // qna[0]
    [
        {
            text: '<strong>활력 Energy 🐱‍🏍🤸‍♀️</strong><br>커피는 포션이다.'
        },
        {
            text: '<strong>휴식 Healing 🐣🌱</strong><br>커피 한 잔의 여유;-)'
        },
        {
            text: '<strong>즐거움 Joy 🥳🎇</strong><br>나랑 카페 탐방할 사람~?'
        },
        {
            text: '<strong>일상 Life 👩‍💻✨</strong><br>반려커피와 함께 사는 중.'
        }
    ],
    // qna[1]
    [
        {
            text: '아침에 마시는 진한 커피가 좋다!⏰'
        },
        {
            text: '식후에는 커피 마셔야지!😊'
        },
        {
            text: '커피랑 디저트를 같이 먹으면, 얼마나 맛있게요?<br>여기 치케 하나 추가요!🍰'
        },
        {
            text: '커피를 물처럼 마시는 편이야~😏'
        }
    ],
    // qna[2]
    [
        {
            text: '커피는 간편하게 마시고 싶어.😴'
        },
        {
            text: '얼어 죽어도 아이스커피, 선언합니다.✋'
        },
        {
            text: '초콜릿보다는 과일처럼 상큼한 디저트가 좋다.🍊'
        },
        {
            text: '나는 저녁에 커피 마시면 밤 새서 안 돼.🌛'
        }
    ]
]
const answer=[
    {
        item_no: '0',
        title: '인텐소',
        desc: `인텐소 진한 커피`,
        img_src: '/img/product/1.png'
    },
    {
        item_no: '1',
        title: '인텐소 리스트레토',
        desc: `리스트레토는 짧은 시간 동안 커피를 추출해 강렬한 커피입니다. 적은 양과 높은 카페인이 특징인 추출방식으로, 아침에 강한 활력을 필요로 하는 당신에게 좋은 친구가 될 수 있겠어요.
        리스트레토 커피는 원두를 숙성시켜 로스팅을 했어요. 특유의 단 맛이 느껴지는 다크 코코아 같은 뭐시기 지역의 향미와 진한 바디감을 느낄 수 있는 캡슐입니다.`,
        img_src: '/img/product/1.png'
    },
    {
        item_no: '2',
        title: '산미 바디감',
        desc: `상품설명`,
        img_src: '/img/product/1.png'
    },
    {
        item_no: '3',
        title: '체리 다크초콜릿',
        desc: `상품설명`,
        img_src: '/img/product/1.png'
    },
    {
        item_no: '4',
        title: '다크 코코아',
        desc: `상품설명`,
        img_src: '/img/product/1.png'
    },
    {
        item_no: '5',
        title: '과일 풍미 산미',
        desc: `상품설명`,
        img_src: '/img/product/1.png'
    },
    {
        item_no: '6',
        title: '가벼운 바디감',
        desc: `상품설명`,
        img_src: '/img/product/1.png'
    },
    {
        item_no: '7',
        title: '디카페인 라인',
        desc: `상품설명`,
        img_src: '/img/product/1.png'
    }
];