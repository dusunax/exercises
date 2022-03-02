let data=[
    [
        {
            test_name: '정보처리기사',
            test_type: '필기',
            test_date: '3월 5일',
            test_place: '서울국가자격시험장(휘경동)',
            score: [
                {
                    score_date: '2022/03/01',
                    score_desc: '2021년 1회',
                    score_scroe: '70'
                },
                {
                    score_date: '2022/03/01',
                    score_desc: '2021년 2회',
                    score_scroe: '50'
                }
            ],
            show_first: true
        },
    ],
    [
        {
            test_name: '정보처리기능사',
            test_type: '실기',
            test_date: '3월 20일',
            test_place: '서울국가자격시험장(휘경동)',
            score: [
                {
                    score_date: '2022/03/02',
                    score_desc: '2021년 1회',
                    score_scroe: '70'
                },
                {
                    score_date: '2022/03/02',
                    score_desc: '2021년 2회',
                    score_scroe: '50'
                }
            ],
            show_first: false
        },
    ]
]

/*
new test
{
    test_name is not null,
    test_type is not null,
    test_date is not null,
    test_place is not null,
    score=[],
    show_first=false
}
*/