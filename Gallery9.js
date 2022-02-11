var group = 0;
let b1 = document.getElementById("btn1");
b1.addEventListener('click', function(){
    group = 1;
    localStorage.setItem("group",group);
    location.assign("Grid.html");
});
let b2 = document.getElementById("btn2");
b2.addEventListener('click', function(){
    group = 2;
    localStorage.setItem("group",group);
    location.assign("Grid.html");
});
let b3 = document.getElementById("btn3");
b3.addEventListener('click', function(){
    group = 3;
    localStorage.setItem("group",group);
    location.assign("Grid.html");
});
let b4 = document.getElementById("btn4");
b4.addEventListener('click', function(){
    group = 4;
    localStorage.setItem("group",group);
    location.assign("Grid.html");
});