const express = require('express');
const bodyParser = require('body-parser')
const ejs = require('ejs');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'))

axios.get('http://www.cgv.co.kr/movies/?lt=1&ft=0')
    .then(html => {
        const $ = cheerio.load(html.data); // .data
        const contents = $(".sect-movie-chart li");
        let arr = [];
        contents.each((idx, li) => {
            const title = $(".title", li).text();
            const score = $(".score > .percent", li).text().replace('예매율', "");
            const egg = $(".egg-gage > .percent", li).text();
            const opening = $(".txt-info strong", li).text().trim().substring(0, 10);
            const img = $(".thumb-image img", li).attr("src");
            if (title) {
                arr.push({
                    title: title,
                    score: score,
                    egg: egg,
                    opening: opening,
                    img: img
                })
            }
        })
        return arr;
    })
    .then(arr=>{
        app.get('/', (req, res)=>{
            res.render('main', {lists: arr})
        })
    })

app.listen('3000', () => {
    console.log('Sever connected on port 3000');
})
