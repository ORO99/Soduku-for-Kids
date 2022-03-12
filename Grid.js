let userName = localStorage.getItem("userName");
let userDate = localStorage.getItem("lastVisit");
var level = localStorage.getItem("level");
var difficulty = localStorage.getItem("difficulty");
let group = localStorage.getItem("group");
let gridSize = Math.pow((+level + 1), 2);
let tilesLeft = gridSize * gridSize;
let started = false;
let gameWon = false;
//let randomCount = level == "1" ? 4 : 30;
let randomCount;
if(level == "1")
{
    switch(difficulty)
    {
        case "1":
            randomCount = 15;
            break;
        case "2":
            randomCount = 4;
            break;
        case "3":
            randomCount = 2;
            break;
    }
}   
else
{
    switch(difficulty)
    {
        case "1":
            randomCount = 75;
            break;
        case "2":
            randomCount = 30;
            break;
        case "3":
            randomCount = 15;
            break;
    }
}
let path = `Images/Level${level}/Group${group}/`;
var timesArray1 = [];
var timesArray2 = [];
let randArray = [];


function level1Reset()
{
    location.assign("Gallery.html");
    localStorage.setItem("level","1");
}
function level2Reset()
{
    location.assign("Gallery9.html");
    localStorage.setItem("level","2");
}
function navigateToRegister()
{ 
    location.assign("Register.html");
}

//music
var win = new Audio();
win.src = "clap.mp3";

var s1 = new Audio();
s1.src = "bk.mp3";

var loss = new Audio();
loss.src = "loss.wav";

function checkDuplicate(arr) {
    console.log(new Set(arr).size);
    console.log(arr.length);
    return new Set(arr).size !== gridSize;
}

function checkAnswers() {
    let tmp, current;
    // rows
    for (let i = 0; i < gridSize; i++) {
        if (checkDuplicate(userAnswers[i])) {
            console.log("false");
            return false;
        }
    }

    // columns
    for (let i = 0; i < gridSize; i++) {
        tmp = [];
        for (let j = 0; j < gridSize; j++) {
            current = userAnswers[j][i];
            tmp.push(current);
        }
        if (checkDuplicate(tmp)) {
            console.log("false");
            return false;
        }
    }

    // small squares
    for (let i = 0; i < gridSize; i += Math.sqrt(gridSize)) {
        for (let j = i; j < Math.sqrt(gridSize) + i; j++) {
            tmp = [];
            for (let k = 0; k < Math.sqrt(gridSize); k++) {
                for (let m = 0; m < gridSize; m += Math.sqrt(gridSize)) {
                    current = userAnswers[j][k + m];
                    tmp.push(current);
                }
            }
            console.log(tmp);
            if (checkDuplicate(tmp)) {
                console.log("false");
                return false;
            }
        }
    }
    console.log("true");
    return true;
    
}
//for random pictures 
//for random pictures
function populateUserAnswersArray(currentTile, i) {
    let x = Math.floor((currentTile - 1) / gridSize);
    let y = (currentTile - 1) % gridSize;
    if (userAnswers[x][y] == undefined) {
        tilesLeft--;
    }
    userAnswers[x][y] = i;
}

function qs(q) {
    return document.querySelector(q);
}

//function place random tiles 
function placeRandomTiles() {
    sodokoSolver(userAnswers);
    let pic, pos;
    let k = 1;
    for(let i=0; i<Math.pow(gridSize,2)-randomCount; i++)
    {
        do
        {
            pos = Math.floor(Math.random() * Math.pow(gridSize,2)) + 1;
            randArray[i] = pos
        }while(new Set(randArray).size !== randArray.length);
        populateUserAnswersArray(pos, undefined);
    }
    console.log(userAnswers);
    for(let i=0; i<gridSize; i++)
    {
        for(let j=0; j<gridSize; j++)
        {
            pic = userAnswers[i][j];
            if(pic !== undefined)
            {
                qs(`#tile${k}`).src = `${path}${pic}.png`;
                qs(`#tile${k}`).style.backgroundColor = "rgba(0, 195, 255, 0.658)";
            }
                

            k++;
        }
    }
    //tilesLeft = gridSize == 4? tilesLeft-=4 : tilesLeft -= 30;
    tilesLeft -= randomCount;
}



function drawGrid() {
    console.log(`Welcome, ${userName}!`)
    console.log(`Your most recent visit: ${userDate}`);
    localStorage.setItem(userName, new Date().toLocaleString());
    var barDimensions = 0;
    var tileDimensions = 0;
    if (gridSize == 4) {
        barDimensions = "100px";
        tileDimensions = "100px";
    } else {
        barDimensions = "50px";
        tileDimensions = "50px";
    }
    let menu = document.querySelector("#bar");
    menu.style.height = barDimensions;
    menu.style.border = "none";    
    for (let i = 1; i <= gridSize; i++) {
        let item = document.createElement('img');
        item.style.display = "inline-block";
        item.style.width = barDimensions;
        item.style.height = barDimensions;
        item.style.border="4.5px solid rgb(54, 8, 58, 0.89)";
        item.id = `item${i}`;
        item.src = `${path}${i}.png`;
        menu.appendChild(item);
    }
    let grid = document.querySelector("#grid");
    let counter = 1;
    for (let i = 0; i < gridSize; i++) {
        let row = document.createElement('div');
        row.style.height = tileDimensions;
        grid.appendChild(row);
        for (let j = 0; j < gridSize; j++) {
            let tile = document.createElement('img');
            tile.style.display = "inline-block";
            tile.style.width = tileDimensions;
            tile.style.height = tileDimensions;
            tile.id = `tile${counter++}`;
            tile.className = "gridTiles";
            row.appendChild(tile);
        }
    }
}

let userAnswers = [];
for (let i = 0; i < gridSize; i++) {
    userAnswers.push([]);
}
function isValid(userAnswers, row, col, k) {
    for (let i = 0; i < gridSize; i++) {
        const m = Math.sqrt(gridSize) * Math.floor(row / Math.sqrt(gridSize)) + Math.floor(i / Math.sqrt(gridSize));
        const n = Math.sqrt(gridSize) * Math.floor(col / Math.sqrt(gridSize)) + i % Math.sqrt(gridSize);
        if (userAnswers[row][i] == k || userAnswers[i][col] == k || userAnswers[m][n] == k) {
          return false;
        }
    }
    return true;
}


function sodokoSolver(data) {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (data[i][j] == undefined) {
        for (let k = 1; k <= gridSize; k++) {
          if (isValid(data, i, j, k)) {
            data[i][j] = k;
          if (sodokoSolver(data)) {
           return true;
          } else {
           data[i][j] = undefined;
          }
         }
       }
       return false;
     }
   }
 }
 return true;
}

let currentTile = 1;
window.addEventListener('load', () => {
    drawGrid();
    getScores();
    let currentTile = 1;
    let selected = qs(`#tile${currentTile}`);
    // let gridtiles = document.querySelectorAll(".gridTiles");
    // gridtiles.forEach(element => {      //mouse event handlers
    //     element.addEventListener('click',function(){
    //         selected.style.border = "3px solid rgb(54, 8, 58, 0.89)"
    //         currentTile = element.id.split('e')[1];
    //         console.log(selected);
    //         selected = qs(`#tile${currentTile}`);
    //         selected.style.border = "3px solid rgb(241, 112, 253)";
    //     });
    // });
    document.addEventListener('click',function(e){
        //console.log(e.target)
        if(e.target.className == "gridTiles")
        {
            selected.style.border = "3px solid rgb(54, 8, 58, 0.89)"
            currentTile = +e.target.id.split('e')[1];
            //currentTile = parseInt(currentTile,10);
            console.log("current tile from mouse");
            console.log(currentTile);
            selected = qs(`#tile${currentTile}`);
            selected.style.border = "3px solid rgb(241, 112, 253)";
            console.log("rand array from mouse: ");
            console.log(randArray);
            console.log(randArray.indexOf(currentTile));
        }
    });
    document.addEventListener('keydown', (e) => {    //keyboard event handlers
        //for (let i = 0; i <= gridSize; i++) {
            // console.log(e.key >= 1);
            // console.log(e.key <= gridSize);
            // console.log(randArray.indexOf(currentTile) !== -1);
            // console.log(currentTile);
        if (e.key >= 1 && e.key <= gridSize && started == true && randArray.indexOf(currentTile) !==  -1)
        {
            //console.log(selected);
            console.log("rand array from keyboard: ");
            console.log(randArray.indexOf(currentTile));
            selected.src = `${path}${e.key}.png`;
            populateUserAnswersArray(currentTile, +e.key);
            //console.log(userAnswers);
            //console.log(tilesLeft);
        }
       // }
        switch (e.code) {
            case "ArrowUp":
                console.log("up")
                selected.style.border = "3px solid rgb(54, 8, 58, 0.89)"
                if (currentTile - gridSize < 1) {
                    currentTile = Math.pow(gridSize, 2) - (gridSize - currentTile);
                } else {
                    currentTile -= gridSize;
                }
                break;
            case "ArrowDown":
                console.log("down")
                selected.style.border = "3px solid rgb(54, 8, 58, 0.89)"
                if (currentTile + gridSize > gridSize * gridSize) {
                    currentTile = (currentTile + gridSize) % Math.pow(gridSize, 2);
                } else {
                    currentTile += gridSize;
                }
                break;
            case "ArrowRight":
                console.log("right")
                selected.style.border = "3px solid rgb(54, 8, 58, 0.89)"
                if (++currentTile > gridSize * gridSize) {
                    currentTile = 1;
                }
                break;
            case "ArrowLeft":
                console.log("left")
                selected.style.border = "3px solid rgb(54, 8, 58, 0.89)"
                if (--currentTile < 1) {
                    currentTile = gridSize * gridSize;
                }
                break;
        }
        console.log("rand array from below keyboard: ");
            console.log(randArray.indexOf(currentTile));
        console.log(currentTile);
        selected = qs(`#tile${currentTile}`);
        selected.style.border = "3px solid rgb(241, 112, 253)";
        if (tilesLeft <= 0) {
            if (checkAnswers()) {
                var finishingTime = timer.innerHTML;
                var mins = parseInt(finishingTime.split(":")[0]) * 60;
                var secs = parseInt(finishingTime.split(":")[1]);
                finishingTime = mins + secs;
                if(localStorage.getItem('scoreCounter'))
                    var x = parseInt(localStorage.getItem("scoreCounter"));
                else
                    var x = 1;
                
                if(localStorage.getItem("level") == "1")
                    localStorage.setItem(`${userName}+${++x}`,finishingTime);
                else
                    localStorage.setItem(`${userName}-${++x}`,finishingTime);
                localStorage.setItem("scoreCounter", x);
                //console.log(finishingTime);
                gameWon = true;
                setTimeout(() => {
                    document.getElementById("alertX").style.display = "block";
                    s1.pause();
                    win.play();
            
                }, 100);
            }
        }
    })
})


// creating start button 
// timer for each level
var button = document.createElement("button");
button.innerHTML = "Start";
var body = document.getElementsByTagName("body")[0];
body.appendChild(button);
button.addEventListener("click", function () {
    this.disabled = true;
    placeRandomTiles();
    started = true;
    s1.play();
    if (level == "1") {
        document.getElementById('timer').innerHTML =
            01+ ":" + 01;
        startTimer();
    }
    else {
        document.getElementById('timer').innerHTML =
            02 + ":" + 01;
        startTimer();
    }

    function startTimer() {
        var presentTime = document.getElementById('timer').innerHTML;
        var timeArray = presentTime.split(/[:]+/);
        var m = timeArray[0];
        var s = checkSecond((timeArray[1] - 1));
        if (s == 59) { m = m - 1 }
        if (m < 0) {
            s1.pause();
            loss.play();
            document.getElementById("alert").style.display = "block";
            return
        }

        document.getElementById('timer').innerHTML =
            m + ":" + s;
        //console.log(m)
        let timer = setTimeout(startTimer, 1000);
        if(gameWon == true)
            clearTimeout(timer);
    }

    function checkSecond(sec) {
        if (sec < 10 && sec >= 0) { sec = "0" + sec }; // add zero in front of numbers < 10
        if (sec < 0) { sec = "59" };
        return sec;
    }


});

//welcome message with the username

let h2 = document.createElement("h2");
h2.id = "msg1";
h2.innerHTML = ("Welcome, " + userName + "!");
document.body.appendChild(h2);



//creating box for last visit:
let visit = document.createElement("date");
visit.id = "visit";
visit.innerHTML = (`Last Visit: ${userDate}`);
document.body.appendChild(visit);

//top achivers name:
let first = document.createElement("first");
first.id = "first";
first.innerHTML = ("Play for a place on the Podium");
first.style.boxShadow = "5px 5px  5px rgb(239, 141, 248, 0.89)";
document.body.appendChild(first);


let second = document.createElement("second");
second.id = "second";
second.innerHTML = ("Play for a place on the Podium");
second.style.boxShadow = "5px 5px  5px rgb(239, 141, 248, 0.89)";
document.body.appendChild(second);


let third = document.createElement("third");
third.id = "third";
third.innerHTML = ("Play for a place on the Podium");
third.style.boxShadow = "5px 5px  5px rgb(239, 141, 248, 0.89)";
document.body.appendChild(third);

function getScores(){
    for(let key in localStorage)
    {
        if(key.includes("+"))
        {
            winnerobj = {
                "name": key.split("+")[0],
                "finishTime": parseInt(localStorage.getItem(key))
            };
            timesArray1.push(winnerobj);
        }
        else if(key.includes("-"))
        {
            winnerobj = {
                "name": key.split("-")[0],
                "finishTime": parseInt(localStorage.getItem(key))
            };
            timesArray2.push(winnerobj);
        }
        else
            continue;
    }
    timesArray1.sort((a,b)=>{
        return b.finishTime - a.finishTime;
    });
    timesArray2.sort((a,b)=>{
        return b.finishTime - a.finishTime;
    });
    if(localStorage.getItem("level") == "1")
    {
        switch(timesArray1.length)
        {
            case 0:
                console.log("lol");
                break;
            case 1:
                first.innerHTML = `Top Score: ${timesArray1[0].name} --> ${timesArray1[0].finishTime}`;
                break;
            case 2:
                first.innerHTML = `Top Score: ${timesArray1[0].name} --> ${timesArray1[0].finishTime}`;
                second.innerHTML = `Second Place: ${timesArray1[1].name} --> ${timesArray1[1].finishTime}`;
                break;
            default:
                first.innerHTML = `Top Score: ${timesArray1[0].name} --> ${timesArray1[0].finishTime}`;
                second.innerHTML = `Second Place: ${timesArray1[1].name} --> ${timesArray1[1].finishTime}`;
                third.innerHTML = `Third Place: ${timesArray1[2].name} --> ${timesArray1[2].finishTime}`;
                break;
        }
    }
    else{
        switch(timesArray2.length)
        {
            case 0:
                console.log("lol");
                break;
            case 1:
                first.innerHTML = `Top Score: ${timesArray2[0].name} --> ${timesArray2[0].finishTime}`;
                break;
            case 2:
                first.innerHTML = `Top Score: ${timesArray2[0].name} --> ${timesArray2[0].finishTime}`;
                second.innerHTML = `Second Place: ${timesArray2[1].name} --> ${timesArray2[1].finishTime}`;
                break;
            default:
                first.innerHTML = `Top Score: ${timesArray2[0].name} --> ${timesArray2[0].finishTime}`;
                second.innerHTML = `Second Place: ${timesArray2[1].name} --> ${timesArray2[1].finishTime}`;
                third.innerHTML = `Third Place: ${timesArray2[2].name} --> ${timesArray2[2].finishTime}`;
                break;
        }

    }
    
    
    
}