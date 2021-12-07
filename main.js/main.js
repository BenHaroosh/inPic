'use strict'
// console.log('hi');

var gQuests
var gCurrQuestIdx
gQuests = [
    { id: 1, opts: ['Leo Messi', 'Cristiano Ronaldo'], correctOptIndex: 1 },
    { id: 2, opts: ['Manchester United', 'Manchester City'], correctOptIndex: 0 },
    { id: 3, opts: ['Amsterdam', 'Venezia'], correctOptIndex: 0 }
]

var gOptsCopy = []
gCurrQuestIdx = 0

function init() {
    renderQuest()

}
function renderQuest() {
    var strHTML = ''
    var elDiv = document.querySelector('.space')
    strHTML += `
    <img class="pic" src="img/1.jpg" />
    <button button1 onclick="checkIfAnswer(this)" class="button button1">Cristiano Ronaldo</button>
    <button button2 onclick="checkIfAnswer(this)" class="button button2">Leo Messi</button>
    `
    elDiv.innerHTML = strHTML
}


function checkIfAnswer(elBtn) {
    var elImg = document.querySelector('.space img')
    var elBtns = document.querySelectorAll('.button')
    var elBtn1 = elBtns[0]
    var elBtn2 = elBtns[1]

    var currQuest = gQuests[gCurrQuestIdx]
    if (gCurrQuestIdx < gQuests.length) {
        if (elBtn.innerText === currQuest.opts[currQuest.correctOptIndex]) {
            if (gCurrQuestIdx === gQuests.length - 1) {
                return checkIfWin()
            }
            gCurrQuestIdx++
            var randWord = drawNum2()
            elBtn1.innerText = randWord
            elBtn2.innerText = gOptsCopy[0]
            elImg.src = `img/${gCurrQuestIdx + 1}.jpg`
            var passAudio = new Audio('sound/pass.mp3');
            passAudio.play();
        } else {
            var wrongAudio = new Audio('sound/wrong.mp3');
            wrongAudio.play();
        }
    }
}
function checkIfWin() {
    var elImg = document.querySelector('.space img')
    var elBtns = document.querySelectorAll('.button')
    var elModal = document.querySelector('.modal')
    var elDiv = document.querySelector('.gifs')

    var strHTML = ''
    for (var i = 0; i < 2; i++) {
        strHTML += `<img class="conffeti conffeti${i + 1}" src="img/conffeti.gif">`
    }
    elDiv.innerHTML = strHTML
    for (var j = 0; j < elBtns.length; j++) {
        elBtns[j].style.display = 'none'

    }


    gCurrQuestIdx++
    elImg.src = `img/${gCurrQuestIdx + 1}.jpg`
    elImg.style.height = 600 + 'px'
    elImg.style.width = 600 + 'px'
    var audio = new Audio('sound/win.mp3');
    audio.play();
    elModal.style.display = 'block'

    setTimeout(function () {
        restart()

    }, 3000)
}

function handleKey(ev) {
    var elModal = document.querySelector('.modal')
    if (ev.keyCode === 27) {
        elModal.style.display = 'none'
    }
}

function removeModal() {
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
}

function restart() {
    var elConffetis = document.querySelectorAll('.conffeti')
    if (confirm('would you like to play again?')) {
        renderQuest()
        gCurrQuestIdx = 0
        for (var i = 0; i < elConffetis.length; i++) {
            elConffetis[i].style.display = 'none'
        }


    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function drawNum2() {
    var currQuest = gQuests[gCurrQuestIdx]
    gOptsCopy = currQuest.opts.slice()
    var idx = getRandomInt(0, gOptsCopy.length)
    var word = gOptsCopy[idx]
    gOptsCopy.splice(idx, 1)
    return word
}