const game = document.getElementById('game');
const block = Array.from(document.querySelectorAll('.block'));
const wins = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];
let gamemode=0; // 바꾸기 모드 Toggle

document.addEventListener('keydown', (e)=>{
    if(e.key === "Enter" && gamemode == 0){
        let modeGuide = document.querySelector('.modeGuide')
        computerClick();
        gamemode = 1;
        gameOn = 1;
        modeGuide.classList.add('on');
        modeGuide.innerHTML="토글모드입니다."
    }
})

function blockClick(idx) {
    if(!gamemode){
        blockChange([idx, 'o']);
    } else if(gamemode){
        blockToggle([idx, 'o']);
    }
    computerClick();
}

function blockChange(props = [idx, content]) {
    let idx = props[0];
    let content = props[1];
    block[idx].classList.add(content);
    chkWinCase(content);
}

function computerClick() {
    let count = 0;
    let bot = block.reduce((bot, e) => {
        if (!e.classList.contains('x') && !e.classList.contains('o')) {
            bot.push(count);
        }
        count++;
        return bot
    }, []);
    let rand = (Math.floor(Math.random() * bot.length));
    if (bot.length) {
        blockChange([bot[rand], 'x']);
    }
}


function chkWinCase(player) {
    let count = 0;
    let users = block.reduce((users, e) => {
        if (e.classList.contains(player)) {
            users.push(count);
        }
        count++;
        return users
    }, []);
    wins.forEach(win => {
        console.log(player);
        if (users.filter(x => win.includes(x)).length >= 3) {
            if (player === 'o') {
                setTimeout(() => {
                    userWin();
                    game.classList.add('end');
                    return;
                }, 100);
            } else {
                setTimeout(() => {
                    comWin();
                    game.classList.add('end');
                    return;
                }, 100);
            }
        }
    });
    let blockLeft = block.filter(e => (!e.classList.contains('x') && !e.classList.contains('o'))).length;
    if (!blockLeft) {
        gamedraw();
        game.classList.add('end');
        return;
    }
}

function userWin() {
    alert("이겼습니다!");
    block.forEach( e => !e.classList.contains('o')?e.classList.add('loose'):"")
    // 클리어 +1
}

function gamedraw() {
    alert("비겼습니다!");
}

function comWin() {
    alert("졌습니다!");
    block.forEach( e => !e.classList.contains('x')?e.classList.add('loose'):"")
}

function blockToggle(props = [idx, content]) {
    let idx = props[0];
    let content = props[1];
    let reverse = (content == 'o') ? 'x' : 'o'
    if (block[idx].classList.contains(content)) {
        block[idx].classList.remove(content);
        block[idx].classList.add(reverse);
    } else if (block[idx].classList.contains(reverse)) {
        block[idx].classList.remove(reverse);
        block[idx].classList.add(content);
    } else {
        block[idx].classList.add(content);
    }
    chkWinCase(content);
}