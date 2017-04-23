var down = document.querySelector('.down'),
    up = document.querySelector('.up'),
    menu = document.querySelector('.menu'),
    btn = document.querySelectorAll('.btn'),
    buttons = document.querySelector('.buttons'),
    bannerList = document.querySelector('.bannerList'),
    content = document.querySelector('.content'),
    tit = document.querySelector('.tit'),
    classifyList = document.querySelector('.classifyList'),
    moreList = document.querySelector('.moreList'),
    timer;

up.addEventListener("click", hide);
down.addEventListener("click", show)

function hide() {
    menu.style.display = "none";
}

function show() {
    menu.style.display = "block";
}

function animate(offset) {
    var _marginLeft = parseInt(bannerList.style.marginLeft) + offset * 100;
    var width = parseInt(bannerList.style.width);
    bannerList.style.marginLeft = _marginLeft + '%';
    if (_marginLeft == -width) {
        bannerList.style.marginLeft = 0;
    }
}

function autobanner() {
    timer = setInterval(function() {
        animate(-1);
    }, 5000)
}

autobanner();

var req = new XMLHttpRequest();
req.open("GET", "/sliders", true);
req.send();
req.onreadystatechange = function(responseText) {
    if (req.readyState == 4 && req.status == 200) {
        var banner = eval(req.responseText);
        var len = banner.length;
        var width = len * 100;
        bannerList.style.width = width + '%';
        for (var i = 0; i < len; i++) {
            bannerList.innerHTML += '<li class="bannerItem"><a href=' + banner[i].link + '><img src=' + banner[i].imgURL + '></a></li>';
            buttons.innerHTML += "<li class = 'btn'></li>"
        }
    }
}

var requ = new XMLHttpRequest();
requ.open("GET", "/new?num=4", true);
requ.send();
requ.onreadystatechange = function(responseText) {
    if (requ.readyState == 4 && requ.status == 200) {
        var news = eval(requ.responseText);
        var len = news.length;
        tit.innerHTML = news[0].title;
        for (var i = 0; i < len; i++) {
            content.innerHTML += '<li class="contentItem"><a href' + news[i].link + '><img src=' + news[i].imgURL + '></a><div class="title">' + news[i].title + '</div><div class="description">' + news[i].description + '</div></li>'
        }
    }
}

var xml = new XMLHttpRequest();
xml.open("GET", "/tags", true);
xml.send();
xml.onreadystatechange = function(responseText) {
    if (xml.readyState == 4 && xml.status == 200) {
        var tags = JSON.parse(xml.responseText);
        var addLen = tags.added.length; 
        var avaLen = tags.avaliable.length;
        console.log(tags);
        for(var i = 0; i < addLen; i++){
            classifyList.innerHTML += '<li class="item"><a><span class="word">' + tags.added[i].name + '</span></a></li>';
        }
        for(var j = 0; j < avaLen; j++){
            moreList.innerHTML += '<li class="moreItem" onclick="add">' + tags.avaliable[j].name + '</li>'
        }
    }
}


var add = function(){
    alert(111);
}

