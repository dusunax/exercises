let data=[
    {
        exam_no: 0,
        exam_name: '정보처리기사',
        exam_type: '필기',
        exam_date: '2022/03/05',
        exam_place: '중화고등학교',
        score: [
            {
                score_date: '2022/03/05',
                score_desc: '2022년 정기 1회',
                test_score: 68
            },
            {
                score_date: '2k022/03/03',
                score_desc: '2020년 1-2회',
                test_score: 70
            },
            {
                score_date: '2022/03/02',
                score_desc: '2020년 랜덤1',
                test_score: 75
            },
            {
                score_date: '2022/03/01',
                score_desc: '2021년 3회',
                test_score: 55
            },
            {
                score_date: '2022/02/28',
                score_desc: '2021년 1회',
                test_score: 61
            },
            {
                score_date: '2022/02/28',
                score_desc: '2021년 2회',
                test_score: 56
            },
            {
                score_date: '2022/02/27',
                score_desc: '2019년 1회',
                test_score: 50
            },
            {
                score_date: '2022/02/27',
                score_desc: '2021년 3회',
                test_score: 39
            }
        ],
        show_first: false,
        pass: true
    },
    {
        exam_no: 1,
        exam_name: '정보처리기능사',
        exam_type: '실기',
        exam_date: '2022/03/20',
        exam_place: '휘경공업고등학교',
        score: [
            {
                score_date: '2022/03/16',
                score_desc: '기출변형문제 01',
                test_score: '70'
            },
        ],
        show_first: true,
        pass: false
    },
    {
        exam_no: 2,
        exam_name: '정보처리기사',
        exam_type: '실기',
        exam_date: null,
        exam_place: null,
        score: [
            {
                score_date: '2022/03/10',
                score_desc: '2021년 1회',
                test_score: '100'
            }
        ],
        show_first: false,
        pass: false
    },
    {
        exam_no: 3,
        exam_name: '컬러리스트기사',
        exam_type: '실기',
        exam_date: '',
        exam_place: '',
        score: [
            {
                score_date: '2022/03/10',
                score_desc: '2021년 1회',
                test_score: '100'
            }
        ],
        show_first: false,
        pass: false
    }
]

/*
new test
{
    exam_no int(3) auto_Increment primary key,
    exam_name varchar(10) is not null,
    exam_type varchar(3) is not null,
    exam_date date,
    exam_place varchar(10),
    score=[],
    show_first=false,
    pass=false
}
*/

// export {data};
