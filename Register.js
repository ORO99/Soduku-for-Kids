let loginBtn = document.getElementById("login");
let levelSelector = document.getElementById("level");
var selected;
levelSelector.addEventListener('change',function(){
    selected = document.getElementById("level").value;
})
//console.log(level);
loginBtn.addEventListener('click',function(e){
    e.preventDefault();
    console.log(selected);
    if(selected == "2")
    {
        var level = "2";
        localStorage.setItem("userName",document.getElementById("name").value);
        localStorage.setItem("level",level);
        location.assign("Gallery9.html");
    }
        
    else
    {
        var level = "1";
        localStorage.setItem("userName",document.getElementById("name").value);
        localStorage.setItem("level",level);
        location.assign("Gallery.html");
    }
        
});