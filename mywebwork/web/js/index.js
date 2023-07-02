/*获取样式*/
function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj, null)[attr];
    }
}
/*运动框架*/
function startMove(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var bStop = true;
        for (var attr in json) {
            var cur = 0;
            if (attr === 'opacity') {
                cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
            } else {
                cur = parseInt(getStyle(obj, attr));
            }
            if (cur != json[attr]) {
                bStop = false;
            }
            var speed = (json[attr] - cur)/10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            cur += speed;
            if (attr === 'opacity') {
                obj.style.filter = 'alpha(opacity:' + cur + ')';
                obj.style.opacity = cur/100;
            } else {
                obj.style[attr] = cur + 'px';
            }

        }
        if (bStop) {
            clearInterval(obj.timer);
            if (fn) fn();
        }

    }, 30);
}

window.onload = function(){
    var oSideBox  = document.getElementById('sideBox');
    var aSideLi   = oSideBox.getElementsByClassName('sideLi');
    for(var i=0;i<aSideLi.length;i++){
        aSideLi[i].onmouseover = function(){
            this.children[0].style.backgroundColor = "#214a76";
            this.children[1].style.display = "block";
            startMove(this.children[1],{opacity:100});
        };
        aSideLi[i].onmouseout = function(){
            startMove(this.children[1],{opacity:0});
            this.children[1].style.display = "none";
            this.children[0].style.backgroundColor = "#306BA8";
        };
    }
};

