'use strict'

var gIsGallery = true

function updateSelectedImgURL(url){
    gSelectedImgURL = url
}

function changeDiv() {
    /*toggle ( token ) - removes token from string and returns false. If token doesn't exist it's added and the function returns true
    document.querySelector('.meme-container').classList.toggle('hidden')
    document.querySelector('.grid-container').classList.toggle('hidden')*/

    var elMemeCon = document.querySelector('.meme-container')
    var elGridCon = document.querySelector('.grid-container')

    if(gIsGallery){
        elMemeCon.style.display = 'grid'
        elGridCon.style.display = 'none'
        gIsGallery = false
    }else{
        onInit()
        elMemeCon.style.display = 'none'
        elGridCon.style.display = 'grid'
        gIsGallery = true
    }
}

function drawCanvas() {
    gCtx.drawImage(gImgObj, 0, 0)

    drawTxt()
}

function drawTxt() {
    for (var i = 0; i < gTexts.length; i++) {
        //if(gTexts[i] === undefined) continue
        gCtx.font = gTexts[i].size + 'px' + ' ' + gTexts[i].fontFamily
        gCtx.textAlign = gTexts[i].align
        gCtx.fillStyle = gTexts[i].color
        if (gTexts[i].isOutline) addTxtOutline(i)

        gCtx.fillText(gTexts[i].text, gTexts[i].x, gTexts[i].y) 
    }
    
}

function addTxtOutline(idx) {
    gCtx.strokeStyle = gTexts[idx].strokeStyle
    gCtx.lineWidth = gTexts[idx].outlineWidth
    gCtx.strokeText(gTexts[idx].text, gTexts[idx].x, gTexts[idx].y)
}

function editTxt(elinput) {
    var property = elinput.dataset.property
    var value

    if(!gTexts.length){
        document.querySelector('.text-input').value = ''
        alert('You have to add a new text box')
        return
    }

    switch (elinput.type) {
        case 'select-one':
            value = elinput.options[elinput.selectedIndex].value
            break;
        case 'checkbox':
            value = elinput.checked
            break;
        default: 
            value = elinput.value
            break;
    }
    gTexts[gPlaceText][property] = value

    drawCanvas()
}

function deleteTxt(){
    if(gTexts.length === 1) {
        gTexts.push(createText())
        gMaxLine = gMaxLine + 1
    }
    

    gTexts.splice(gPlaceText, 1)
    gMaxLine = gMaxLine - 1

    document.querySelector('.text-input').value = ''

    drawCanvas()
    renderMemeEditor()
}

function biggerTxt(){
    gTexts[gPlaceText].size += 5
    drawCanvas()
    renderMemeEditor()
}

function smallerTxt(){
    gTexts[gPlaceText].size -= 5
    drawCanvas()
    renderMemeEditor()
}

function leftTxt(){
    gTexts[gPlaceText].align = 'right' //לבדוק למה זה הפוך ימין ושמאל
    drawCanvas()
    renderMemeEditor()
}

function centerTxt(){
    gTexts[gPlaceText].align = 'center'
    drawCanvas()
    renderMemeEditor()
}

function rightTxt(){
    gTexts[gPlaceText].align = 'left' //לבדוק למה זה הפוך ימין ושמאל
    drawCanvas()
    renderMemeEditor()
}

function upTxt(){
    gTexts[gPlaceText].y -= 5

    drawCanvas()
    renderMemeEditor()
}

function downTxt(){
    gTexts[gPlaceText].y += 5

    drawCanvas()
    renderMemeEditor()
}

function addTxt(){ 
    gMaxLine = gMaxLine + 1
    gPlaceText = gMaxLine
    gTexts.push(createText())

    renderCanvas(0)
    //drawCanvas()
    renderMemeEditor()
}

function changeLine(){ 
    if(gPlaceText < gMaxLine) gPlaceText++
    else gPlaceText = 0
    document.querySelector('.text-input').value = gTexts[gPlaceText].text
}

/*function onDragStart(event) {
    event
        .dataTransfer
        .setData('text/plain', event.target.id)
}

function onDragOver(event) {
    event.preventDefault()
}

function onDrop(event) {
    const id = event
      .dataTransfer
      .getData('text')

    const draggableElement = document.querySelector('.picture')
    const dropzone = event.target
    dropzone.appendChild(draggableElement)

    event
    .dataTransfer
    .clearData()
}*/

function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}

