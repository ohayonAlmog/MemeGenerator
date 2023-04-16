'use strict'

var gImgs = []

function onInit() {
    gTexts = []
    gPlaceText = 0
    gMaxLine = 1
    gIsGallery = true
    pushImages()
    renderImages()
}

function pushImages() {
    for (var i = 1; i < 19; i++) {
        gImgs.push(createImage(`img/squares/${i}.jpg`, 'happy'))
    }
}

function createImage(url, searchWord) {
    return {
        id: makeId(), //לבדוק אחכ האם זה נחוץ בהמשך
        url,
        searchWord,
    }
}

function renderImages() {
    var strHtml = gImgs.map(function (img) {
        return `<img id='${img.id}' src='${img.url}' onclick="memeEditor('${img.url}')"/>`
    }).join(' ')

    /*var strHtml = ''

    for (var i = 0; i < gImgs.length; i++) {
        
        var myImg = gImgs[i]
        strHtml += `<img id='${myImg.id}' src='${myImg.url}' onclick="memeEditor('${myImg.id}')"/>`

        if(i === gImgs.length - 1) strHtml += ' '
    }*/
        
    document.querySelector('.grid-container').innerHTML = strHtml;
}