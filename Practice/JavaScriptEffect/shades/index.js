//1.先创建div,并安排好每个div的位置和背景图
var oBanner = document.getElementById("banner");
var frg = document.createDocumentFragment();
var col = 10;
var row = 3;
var boxW = oBanner.offsetWidth / col;
var boxH = oBanner.offsetHeight / row;
var ary = [];
for (var j = 0; j < row; j++) {
    for (var i = 0; i < col; i++) {
        var oDiv = document.createElement("div");
        oDiv.style.width = 0;
        oDiv.style.height = 0;
        var l = i * boxW;
        var t = j * boxH;
        oDiv.style.left = "-300px";
        oDiv.style.top = "-500px";
        oDiv.l = l;
        oDiv.t = t;
        oDiv.style.backgroundPosition = "-" + l + "px -" + t + "px";
        frg.appendChild(oDiv);
        ary.push(oDiv);
    }
}
oBanner.appendChild(frg);
for (var i = 0; i < ary.length; i++) {
    ~(function (i) {
        window.setTimeout(function () {
            animate(ary[i], {"width": boxW, "height": boxH, "left": ary[i].l, "top": ary[i].t}, 600, 3);
        }, i % col * 100);
    })(i)
}


