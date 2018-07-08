AOS.init();
if ($(window).width() < 767) {
     $("html").niceScroll({
  autohidemode: "hidden",
});
}
else {
    $("html").niceScroll({
      cursorcolor:"#b33b9d",
    cursorwidth:"8px"
});
}
window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              window.oRequestAnimationFrame      ||
              window.msRequestAnimationFrame     ||
      function( callback ){
          window.setTimeout(callback, 1000 / 60);
   };
})();
var c = document.getElementById("canv");
var $ = c.getContext("2d");
var w = c.width = window.innerWidth,
    h = c.height = window.innerHeight;
pt = {x: w / 2, y: h / 2};
var persp = 600,    num = 50;var arr = [];var off_top = c.offsetTop,    off_left = c.offsetLeft;var ms = {x: 0, y: 0};window.addEventListener('load', resize);window.addEventListener('resize', resize, false);
function resize() {		c.width = w = window.innerWidth;		c.height = h = window.innerHeight;		c.style.position = 'absolute';		c.style.left = (window.innerWidth - w) *      .01 + 'px';		c.style.top = (window.innerHeight - h) *      .01 + 'px';}
function create(){    var ball;    for(var i = 0; i < num; i += 1){        ball = new Ball();        ball.go();        arr.push(ball);    }}
function run(){    var ball;    for(var i = 0; i < num; i += 1){        ball = arr[i];        ball.upd((ms.x - pt.x) * 0.0000802,                 (ms.y - pt.y) * 0.000106);    }    arr.sort(z);    draw();}
function z(a, b){    var Z1 = a["Z"];    var Z2 = b["Z"];    if(Z1 < Z2){        return 1;    }else if(Z1 > Z2){        return -1;    }else{        return 0;    }
}
function draw(){
    var ball;    $.globalCompositeOperation='lighter';
    $.fillStyle = "hsla(0,5%,5%,1)";
    $.clearRect(0, 0, w, h);    for(var i = 0; i < num; i += 1){        ball = arr[i];        $.fillStyle = ball.color;        $.beginPath();        $.arc(pt.x + ball.pos_X * ball.scale, pt.y +              ball.pos_Y * ball.scale, 10 *              ball.scale, 0, Math.PI * 2, false);
        $.fill();
    }
}
this.addEventListener("mousemove", function(e){    ms.x = e.clientX - off_left;    ms.y = e.clientY - off_top;
});
function Ball(){
    this.pos_X;    this.pos_Y;    this.pos_Z;    this.ang_X;    this.ang_Y;    this.color;    this.scale;
}
Ball.prototype = {
    go : function(){        this.pos_X = Math.random() * 700 - 400;
        this.pos_Y = Math.random() * 600 - 300;        this.pos_Z = Math.random() * 400 - 100;
        this.color = this.rndCol();    },

    rndCol : function(){        var r = Math.floor(Math.random() * 195);        var g = Math.floor(Math.random() * 95);        var b = Math.floor(Math.random() * 255);        return "rgb(" + r + "," + g + "," + b + ")";    },

    upd : function(ang_X, ang_Y){        this.ang_X = ang_Y;        this.ang_Y = ang_X;        this.rotX();
        this.rotY();        this.scale = persp / (persp + this.pos_Z);
    },
    rotX : function(){        var cosX = Math.cos(this.ang_X);        var sinX = Math.sin(this.ang_X);
        var y1 = this.pos_Y * cosX - this.pos_Z * sinX;        var z1 = this.pos_Z * cosX + this.pos_Y * sinX;        this.pos_Y = y1;        this.pos_Z = z1;    },

    rotY : function(){        var cosY = Math.cos(this.ang_Y);        var sinY = Math.sin(this.ang_Y);
        var x1 = this.pos_X * cosY - this.pos_Z * sinY;        var z1 = this.pos_Z * cosY + this.pos_X * sinY;        this.pos_X = x1;
        this.pos_Z = z1;    }
}
loop();
window.requestAnimFrame(create);
function loop() {  window.requestAnimFrame(run);  window.requestAnimFrame(loop, 60);
}
$(function(){
    $('.carousel').carousel({
      interval: 400
    });
});
