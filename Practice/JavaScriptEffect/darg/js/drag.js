//->JS���ṩ�ĺ���ģ������,��ȡ�Ľ����Զ������,����С����������Լ�������������
//->�������������С��TOP����LEFTֵ
var oBox = document.getElementById("box");
var minL = 0,
    minT = 0,
    maxL = (document.documentElement.clientWidth || document.body.clientWidth) - oBox.offsetWidth,
    maxT = (document.documentElement.clientHeight || document.body.clientHeight) - oBox.offsetHeight;

//1��ʵ����ק
on(oBox, "mousedown", down);
function down(ev) {
    this["strX"] = ev.clientX;
    this["strY"] = ev.clientY;
    this["strL"] = this.offsetLeft;
    this["strT"] = this.offsetTop;

    var _this = this;
    _this["MOVE"] = function (e) {
        move.call(_this, e);
    };
    _this["UP"] = function (e) {
        up.call(_this, e);
    };
    on(document, "mousemove", _this["MOVE"]);
    on(document, "mouseup", _this["UP"]);

    //->������ק֮ǰ�Ȱ������������еĶ���ֹͣ
    window.clearInterval(_this["flyTimer"]);
    window.clearInterval(_this["dropTimer"]);
}
function move(ev) {
    //->thisָ�����oBox
    var curL = ev.clientX - this["strX"] + parseFloat(this["strL"]);
    var curT = ev.clientY - this["strY"] + parseFloat(this["strT"]);
    curL = curL < minL ? minL : (curL > maxL ? maxL : curL);
    curT = curT < minT ? minT : (curT > maxT ? maxT : curT);
    this.style.left = curL + "px";
    this.style.top = curT + "px";

    //->����ˮƽ�����˶����ٶ�
    if (!this["prev"]) {
        this["prev"] = this.offsetLeft;
    } else {
        this["speedFly"] = this.offsetLeft - this["prev"];
        this["prev"] = this.offsetLeft;
    }
}
function up(ev) {
    //->thisָ�����oBox
    off(document, "mousemove", this["MOVE"]);
    off(document, "mouseup", this["UP"]);

    //->����ˮƽ�����˶��Ķ���
    fly.call(this);

    //->������ֱ�����˶��Ķ���
    drop.call(this);
}


//2��ʵ��ˮƽ������˶�����
function fly() {
    var _this = this,
        speedFly = _this["speedFly"];
    _this["flyTimer"] = window.setInterval(function () {
        if (Math.abs(speedFly) < 0.5) {
            window.clearInterval(_this["flyTimer"]);
            return;
        }
        speedFly *= 0.98;
        var curL = _this.offsetLeft + speedFly;
        if (curL >= maxL) {
            _this.style.left = maxL + "px";
            speedFly *= -1;
        } else if (curL <= minL) {
            _this.style.left = minL + "px";
            speedFly *= -1;
        } else {
            _this.style.left = curL + "px";
        }
    }, 10);
}

//3��ʵ�ִ�ֱ������˶�����
function drop() {
    var _this = this,
        speedDrop = 9.8;
    _this["dropFlag"] = 0;
    _this["dropTimer"] = window.setInterval(function () {
        if (_this["dropFlag"] > 1) {
            window.clearInterval(_this["dropTimer"]);
            return;
        }
        speedDrop += 10;
        speedDrop *= 0.98;
        var curT = _this.offsetTop + speedDrop;
        if (curT >= maxT) {
            curT = maxT;
            speedDrop *= -1;
            _this["dropFlag"]++;
        } else {
            _this["dropFlag"] = 0;
        }
        _this.style.top = curT + "px";
    }, 10);
}