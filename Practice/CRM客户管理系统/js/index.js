var boxList = document.getElementById("boxList");
ajax({
    url: "/getAllList?_=" + Math.random(),
    type: "get",
    success: function (data) {
        var str = '';
        for (var i = 0, len = data.length; i < len; i++) {
            var curData = data[i];
            str += '<li>';
            str += '<span class="w50">' + curData["id"] + '</span>';
            str += '<span class="w200">' + curData["name"] + '</span>';
            str += '<span class="w50">' + curData["age"] + '</span>';
            str += '<span class="w200">' + curData["phone"] + '</span>';
            str += '<span class="w150">' + curData["address"] + '</span>';
            str += '<span class="w150">';
            str += '<a href="add.html?id=' + curData["id"] + '">修改</a>';
            str += '<a href="javascript:;" cusId="' + curData["id"] + '">删除</a>';
            str += '</span>';
            str += '</li>'
        }
        boxList.innerHTML = str;
    }
});
boxList.onclick = function (ev) {
    ev = ev || window.event;
    var tar = ev.target || ev.srcElement;
    var tarTag = tar.tagName.toUpperCase();
    if (tarTag === "A" && tar.innerHTML === "删除") {
        var cusId = tar.getAttribute("cusId");
        var flag = window.confirm("确定要删除编号为[" + cusId + "]这个客户吗？");
        if (!flag) {
            return;
        }
        ajax({
            url: "/remove?id=" + cusId + "&_=" + Math.random(),
            type: "get",
            success: function (data) {
                if (data["code"] == 0) {
                    boxList.removeChild(tar.parentNode.parentNode);
                }
                alert(data["message"]);
            }
        });
    }
};
