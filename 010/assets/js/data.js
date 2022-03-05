let data=[
    {
        test_name: '정보처리기사',
        test_type: '필기',
        test_date: '2022/03/05',
        test_place: '중화고등학교',
        score: [
            {
                score_date: '2022/03/05',
                score_desc: '2022년 정기 1회',
                score_score: 68
            },
            {
                score_date: '2022/03/03',
                score_desc: '2020년 1-2회',
                score_score: 70
            },
            {
                score_date: '2022/03/02',
                score_desc: '2020년 랜덤1',
                score_score: 75
            },
            {
                score_date: '2022/03/01',
                score_desc: '2021년 3회',
                score_score: 55
            },
            {
                score_date: '2022/02/28',
                score_desc: '2021년 1회',
                score_score: 61
            },
            {
                score_date: '2022/02/28',
                score_desc: '2021년 2회',
                score_score: 56
            },
            {
                score_date: '2022/02/27',
                score_desc: '2019년 1회',
                score_score: 50
            },
            {
                score_date: '2022/02/27',
                score_desc: '2021년 3회',
                score_score: 39
            }
        ],
        show_first: true,
        pass: true
    },
    {
        test_name: '정보처리기능사',
        test_type: '실기',
        test_date: '2022/03/05',
        test_place: '서울국가자격시험장(휘경동)',
        score: [
            {
                score_date: '2022/03/02',
                score_desc: '2021년 1회',
                score_score: '70'
            },
            {
                score_date: '2022/03/02',
                score_desc: '2021년 2회',
                score_score: '50'
            }
        ],
        show_first: false,
        pass: false
    }
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

// export {data};