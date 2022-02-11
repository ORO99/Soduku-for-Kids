let userName = localStorage.getItem("userName");
let userDate = localStorage.getItem(userName);
var level = localStorage.getItem("level");
let group = localStorage.getItem("group");
let gridSize = Math.pow((+level + 1), 2);
let started = false;
let gameWon = false;
let randomCount = level == "1" ? 4 : 30;
let path = `Images/Level${level}/Group${group}/`;
var timesArray1 = [];
var timesArray2 = [];


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
                return false;
            }
        }
    }

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
    let pic, pos;
    for (let i = 1; i <= randomCount; i++) {
    
        if(gridSize == 4)
        {
            pos = Math.floor(Math.random() * 16) + 1;
            pic = Math.floor(Math.random() * 4) + 1;
        }
        if(gridSize == 9)
        {
            pos = Math.floor(Math.random() * 81) + 1;
            pic = Math.floor(Math.random() * 9) + 1;
        }
        qs(`#tile${pos}`).src = `${path}${pic}.png`;
        populateUserAnswersArray(pos, pic);
    }
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
            row.appendChild(tile);
        }
    }
}

let userAnswers = [];
for (let i = 0; i < gridSize; i++) {
    userAnswers.push([]);
}

let tilesLeft = gridSize * gridSize;
let currentTile = 1;
window.addEventListener('load', () => {
    drawGrid();
    placeRandomTiles();
    getScores();
    let currentTile = 1;
    let selected = qs(`#tile${currentTile}`);
    //selected.style.borderColor = "yellow"
    document.addEventListener('keydown', (e) => {
        for (let i = 0; i <= gridSize; i++) {
            if (e.key == i && started == true) {
                selected.src = `${path}${i}.png`;
                populateUserAnswersArray(currentTile, i);
            }
        }
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
        selected = qs(`#tile${currentTile}`);
        selected.style.border = "3px solid rgb(241, 112, 253)"
        if (tilesLeft == 0) {
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
    started = true;
    s1.play();
    if (level == "1") {
        document.getElementById('timer').innerHTML =
            01+ ":" + 20;
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
        console.log(m)
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
document.body.appendChild(first);


let second = document.createElement("second");
second.id = "second";
second.innerHTML = ("Play for a place on the Podium");
document.body.appendChild(second);


let third = document.createElement("third");
third.id = "third";
third.innerHTML = ("Play for a place on the Podium");
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