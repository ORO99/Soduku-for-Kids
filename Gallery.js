/*let Qstring = window.location.search.split('&');
let userName = Qstring[0].split('=')[1];
let level = Qstring[1].split('=')[1];
localStorage.setItem("userName",userName);
localStorage.setItem("level",level);*/

let group = 0;
DrawGallery4x4();

function DrawGallery4x4()
{
    let container = document.createElement("div"); //main container
    container.id = "container";

    let topContainer = document.createElement("div"); //top container containing top 2 groups
    topContainer.id = "topContainer";
    let group1 = document.createElement("div");
    group1.id = "g1";
    let g1top = document.createElement("div");
    g1top.id = "g1top";
    let g1bottom = document.createElement("div");
    g1bottom.id = "g1bottom";

    let group2 = document.createElement("div");
    group2.id = "g2";
    let g2top = document.createElement("div");
    g2top.id = "g2top";
    let g2bottom = document.createElement("div");
    g2bottom.id = "g2bottom";
    
    let bottomContainer = document.createElement("div"); // bottom container containing bottom 2 groups
    bottomContainer.id = "bottomContainer";
    let group3 = document.createElement("div");
    group3.id = "g3";
    let g3top = document.createElement("div");
    g3top.id = "g3top";
    let g3bottom = document.createElement("div");
    g3bottom.id = "g3bottom";

    let group4 = document.createElement("div");
    group4.id = "g4";
    let g4top = document.createElement("div");
    g4top.id = "g4top";
    let g4bottom = document.createElement("div");
    g4bottom.id = "g4bottom";

    
    let img1 = document.createElement("img");
    img1.src = "Images/Level1/Group1/1.png";
    let img2 = document.createElement("img");
    img2.src = "Images/Level1/Group1/2.png";
    let img3 = document.createElement("img");
    img3.src = "Images/Level1/Group1/3.png";
    let img4 = document.createElement("img");
    img4.src = "Images/Level1/Group1/4.png";
    let img5 = document.createElement("img");
    img5.src = "Images/Level1/Group2/1.png";
    let img6 = document.createElement("img");
    img6.src = "Images/Level1/Group2/2.png";
    let img7 = document.createElement("img");
    img7.src = "Images/Level1/Group2/3.png";
    let img8 = document.createElement("img");
    img8.src = "Images/Level1/Group2/4.png";
    let img9 = document.createElement("img");
    img9.src = "Images/Level1/Group3/1.png";
    let img10 = document.createElement("img");
    img10.src = "Images/Level1/Group3/2.png";
    let img11 = document.createElement("img");
    img11.src = "Images/Level1/Group3/3.png";
    let img12 = document.createElement("img");
    img12.src = "Images/Level1/Group3/4.png";
    let img13 = document.createElement("img");
    img13.src = "Images/Level1/Group4/1.png";
    let img14 = document.createElement("img");
    img14.src = "Images/Level1/Group4/2.png";
    let img15 = document.createElement("img");
    img15.src = "Images/Level1/Group4/3.png";
    let img16 = document.createElement("img");
    img16.src = "Images/Level1/Group4/4.png";
    let b1 = document.createElement("button");
    b1.innerHTML = "Group 1";
    b1.addEventListener('click', function(){
        group = 1;
        localStorage.setItem("group",group);
        location.assign("Grid.html");
    });
    let b2 = document.createElement("button");
    b2.innerHTML = "Group 2";
    b2.addEventListener('click', function(){
        group = 2;
        localStorage.setItem("group",group);
        location.assign("Grid.html");
    });
    let b3 = document.createElement("button");
    b3.innerHTML = "Group 3";
    b3.addEventListener('click', function(){
        group = 3;
        localStorage.setItem("group",group);
        location.assign("Grid.html");
    });
    let b4 = document.createElement("button");
    b4.innerHTML = "Group 4";
    b4.addEventListener('click', function(){
        group = 4;
        localStorage.setItem("group",group);
        location.assign("Grid.html");
    });

    g1top.appendChild(img1);
    g1top.appendChild(img2);
    g1bottom.appendChild(img3);
    g1bottom.appendChild(img4);
    group1.appendChild(g1top);
    group1.appendChild(g1bottom);
    group1.appendChild(b1);

    g2top.appendChild(img5);
    g2top.appendChild(img6);
    g2bottom.appendChild(img7);
    g2bottom.appendChild(img8);
    group2.appendChild(g2top);
    group2.appendChild(g2bottom);
    group2.appendChild(b2);

    g3top.appendChild(img9);
    g3top.appendChild(img10);
    g3bottom.appendChild(img11);
    g3bottom.appendChild(img12);
    group3.appendChild(g3top);
    group3.appendChild(g3bottom);
    group3.appendChild(b3);

    g4top.appendChild(img13);
    g4top.appendChild(img14);
    g4bottom.appendChild(img15);
    g4bottom.appendChild(img16);
    group4.appendChild(g4top);
    group4.appendChild(g4bottom);
    group4.appendChild(b4);

    topContainer.appendChild(group1);
    topContainer.appendChild(group2);
    bottomContainer.appendChild(group3);
    bottomContainer.appendChild(group4);
    container.appendChild(topContainer);
    container.appendChild(bottomContainer);
    var primediv = document.createElement("div");
    primediv.id = "particles-js";
    primediv.appendChild(container);
    document.body.appendChild(primediv);
    
}