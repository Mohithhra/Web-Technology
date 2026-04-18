// your code goes here

function startTimer() {
    timer = setTimeout(function() {
        alert("Executed");
    }, 5000);
}

function stopTimer() {
    clearTimeout(timer);
}

let count = 0;
let interval;

function start(){
    interval = setInterval(function() {
        count++;
        document.getElementById("counter").innerText = count;
    }, 1000);
}

function stop() {
    clearInterval(interval);
}

function fadeIn() {
    let opacity = 0;
    let box = document.getElementById("box");
    
    let interval = setInterval(function() {
        if(opacity >= 1){
            clearInterval(interval);
        }
        opacity += 0.1;
        box.style.opacity = opacity;
    }, 100);
}

function move(){
    let position=0;
    let box=document.getElementById("box");

    let interval=setInterval(function(){
        if(position>= 300){
            clearInterval(interval);
        }
        position+=5;
        box.style.left=position+ "px";
    },20);
}