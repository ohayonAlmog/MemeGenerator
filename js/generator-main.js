'use strict'

var gSelectedImgURL = ''
var gTexts = []
var gPlaceText = 0
var gMaxLine = 1
var gCtx
var gImgObj

function memeEditor(url) {
    updateSelectedImgURL(url)
    changeDiv()
    gTexts.push(createText())
    gTexts.push(createText())
    renderCanvas(1)
    renderMemeEditor()
}

function createText(){
    return {
        text: 'Add Your Text',
        x: 155,
        y: 60,
        id: makeId(),
        align: 'center',
        color: '#ffffff',
        fontFamily: 'Impact',
        size: 35,
        isOutline: true,
        outlineWidth: 4,
        strokeStyle: '#000000',
    }
}

function renderMemeEditor() {
    var strHtml = `<div class="meme-editor">
                   
                        <p>
                        <button onclick="changeLine()"><i class="fa-solid fa-retweet"></i></button>
                        <button onclick="addTxt()"><i class="fa-solid fa-plus"></i> Add Text</button>
                        <button onclick="leftTxt()"><i class="fa-solid fa-align-left"></i></button>
                        <button onclick="centerTxt()"><i class="fa-solid fa-align-center"></i></button>
                        <button onclick="rightTxt()"><i class="fa-solid fa-align-right"></i></button>
                        <button onclick="upTxt()"><i class="fa-solid fa-up-long"></i></button>
                        <button onclick="downTxt()"><i class="fa-solid fa-down-long"></i></button>
                        </p>
    
                        <p>
                        <button onclick="deleteTxt()"><i class="fa-solid fa-eraser"></i></button>
                        <input class="text-input" type="text" data-property="text" placeholder="${gTexts[gPlaceText].text}" oninput="editTxt(this)">
                        <input type="color" value="${gTexts[gPlaceText].color}" data-property="color" oninput="editTxt(this)">
                        </p>

                        <p>
                        Text Size:
                        <button onclick="biggerTxt()"><i class="fa-regular fa-square-plus"></i></button><button onclick="smallerTxt()"><i class="fa-regular fa-square-minus"></i></button>
                        Font: 
                        <select data-property="fontFamily" oninput="editTxt(this)">
                        <option value="Impact">Impact</option>
                        <option value="Tahoma">Tahoma</option>
                        <option value="Brush Script MT">Brush Script MT</option>
                        <option value="Verdana">Verdana</option>
                        <option value="Garamond">Garamond</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Trebuchet MS">Trebuchet MS</option>
                        </select>
                        </p>

                        <p>
                        <input id="outline" type="checkbox" data-property="isOutline" checked onclick="editTxt(this)">
                        <label for="outline">Outline</label>
                        Width: <input type="number" value="${gTexts[gPlaceText].outlineWidth}"  min="0" step="1" data-property="outlineWidth" oninput="editTxt(this)">
                        <input type="color" value="${gTexts[gPlaceText].strokeStyle}" data-property="strokeStyle" oninput="editTxt(this)">
                        </p>

                        <p>
                        <label class="label-input" for="upload"><i class="fa-solid fa-image"></i> Upload Image</label>
                        <input class="image-upload" id="upload" type="file" style="display: none;" onchange="onImgInput(event)">
                        <button onclick="onUploadImg()">Share On <i class="fa-brands fa-facebook"></i></button>
                        <a href="#" class="a" onclick="downloadImg(this)" download="my-img.jpg">Download as jpeg</a>
                        </p>

                        <p>
                        <button onclick="changeDiv()"><i class="fa-solid fa-caret-left"></i> Back to Gallery</button>
                        </p>
                 
                </div>`

    document.querySelector('.txt-editor').innerHTML = strHtml
}

function renderCanvas(lines = 0) {
    var elCanvas = document.querySelector('.canvas')
    gCtx = elCanvas.getContext('2d')

    gImgObj = new Image()
    gImgObj.src = gSelectedImgURL

    gImgObj.onload = function () {
        elCanvas.width = gImgObj.width
        elCanvas.height = gImgObj.height

        if(lines){
            gTexts[0].y = gImgObj.height / 6 * 5.5 //- gImgObj.height * 0.1 //- 70
            gTexts[0].x = gImgObj.width * 0.5

            gTexts[1].y = gImgObj.height / 6  //+ 70
            gTexts[1].x = gImgObj.width * 0.5
            gPlaceText = gPlaceText + 1
        }else{
            gTexts[gPlaceText].y = gImgObj.height * 0.5
            gTexts[gPlaceText].x = gImgObj.width * 0.5
        }

        drawCanvas()
    }
}

