const axios = require('axios');
const cheerio = require('cheerio');

// async function main() {
//     const res = await axios.get(
//         'https://yjiq150.github.io/coronaboard-crawling-sample/dom'
//     );
//     const $ = cheerio.load(res.data);
//     const element = $('.slide p')
//     element.each((idx, el)=>{
//         console.log($(el).text());
//     })
// }

async function getHTML(){
    try {
        return await axios.get(
            'https://yjiq150.github.io/coronaboard-crawling-sample/dom'
        )
    } catch(err){
        console.log(err)
    }

}
getHTML()
.then(html => {
    // console.log(html); // 크롤링한 내용
    
    const $ = cheerio.load(html.data); // .data
    const element = $('.slide p')
    element.each((idx, el)=>{
        console.log($(el).text());
    })
})

// main()
// .then(()=>{console.log('here')})