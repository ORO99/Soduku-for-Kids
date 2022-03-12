let loginBtn = document.getElementById("login");
let levelSelector = document.getElementById("level");
var selectedLevel;
levelSelector.addEventListener('change',function(){
    selectedLevel = document.getElementById("level").value;
});
let difficultySelector = document.getElementById("difficulty");

loginBtn.addEventListener('click',function(e){
    e.preventDefault();
    if(selectedLevel == "2")
    {
        var level = "2";
        location.assign("Gallery9.html");
    }
        
    else
    {
        var level = "1";
        location.assign("Gallery.html");
    }
    localStorage.setItem("userName",document.getElementById("name").value);
    localStorage.setItem("level",level);
    localStorage.setItem("difficulty",difficultySelector.value);
    let userName = localStorage.getItem("userName");
    let lastVisit = localStorage.getItem(userName)
    localStorage.setItem("lastVisit", lastVisit)
    localStorage.setItem(userName, new Date().toLocaleString());
        
});