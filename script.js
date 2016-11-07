var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = "#111";
ctx.fillRect(0, 0, canvas.width, canvas.height);

var lastPoints = {};

function touchEvt(e) {
    e.preventDefault();
    for (var touchId in e.touches) {
        if (e.touches.hasOwnProperty(touchId)) {
            var touch = e.touches[touchId];
            stroke(touch, touchId);
        }
    }
}

function stroke(e, touch) {
    if (touch == undefined) {
        touch = 0;
    } else {
        e.which = 1;
    }
    if (e.which != 0) {
        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.lineWidth = 5;
        ctx.strokeStyle = "#FFF";
        ctx.moveTo(lastPoints[touch][0], lastPoints[touch][1]);
        ctx.lineTo(e.pageX, e.pageY);
        ctx.stroke();
        lastPoints[touch] = [e.pageX, e.pageY];
    }
}
document.addEventListener("mousedown", function(e) {
    lastPoints[0] = [e.pageX, e.pageY];
    stroke(e);
}, false);
document.addEventListener("mousemove", stroke, false);
document.addEventListener("mouseup", stroke, false);

document.addEventListener("touchstart", function(e){
    for (var touchId in e.touches) {
        if (e.touches.hasOwnProperty(touchId)) {
            var touch = e.touches[touchId];
            lastPoints[touchId] = [e.pageX, e.pageY];
            stroke(touch, touchId);
        }
    }
}, false);
document.addEventListener("touchmove", touchEvt, false);
document.addEventListener("touchend", touchEvt, false);
document.querySelector("button").onclick = function(e) {
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
