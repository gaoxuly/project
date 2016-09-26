var n = 1, total = 0;
var $bindPlan = $.Callbacks();
//->绑定列表区域的数据
function bindList(data) {
    var str = '';
    $.each(data, function (index, curData) {
        var sex = curData["sex"] == 1 ? "女" : "男";
        str += '<li num="' + curData["num"] + '" name="' + curData["name"] + '">';
        str += '<span>' + curData["num"] + '</span>';
        str += '<span>' + curData["name"] + '</span>';
        str += '<span>' + sex + '</span>';
        str += '<span>' + curData["score"] + '</span>';
        str += '</li>';
    });
    $(".boxList").html(str);
}
$bindPlan.add(bindList);

//->绑定分页区域的数据
function bindPage() {
    var str = '';
    for (var i = 1; i <= total; i++) {
        str += '<li>' + i + '</li>';
    }
    $("#pageList").html(str);

    //->执行一次即可
    $bindPlan.remove(arguments.callee);
}
$bindPlan.add(bindPage);

//->让当前页码选中
function checkBg() {
    $("#pageList").children("li").eq(n - 1).addClass("bg").siblings().removeClass("bg");
}
$bindPlan.add(checkBg);

//->让文本框中显示当前的页码:计划中绑定匿名函数会导致以后无法移除
$bindPlan.add(function () {
    $("#search").val(n);
});


//->给分页区域的按钮绑定点击事件
function bindEvent() {
    $(".boxBtn").delegate("span", "click", function () {
        var inn = $(this).html();
        if (inn === "FIRST") {
            if (n == 1) {
                return;
            }
            n = 1;
        }
        if (inn === "LAST") {
            if (n == total) {
                return;
            }
            n = total;
        }
        if (inn === "PREV") {
            if (n == 1) {
                return;
            }
            n--;
        }
        if (inn === "NEXT") {
            if (n == total) {
                return;
            }
            n++;
        }
        sendAjax();
    }).delegate("li", "click", function () {
        var inn = parseFloat($(this).html());
        if (inn == n) {
            return;
        }
        n = inn;
        sendAjax();
    });

    $bindPlan.remove(bindEvent);
}
$bindPlan.add(bindEvent);

//->给列表区域的每一条记录绑定点击事件
function bindLink() {
    $(".boxList").on("click", function (ev) {
        var tar = ev.target,
            $tar = $(tar),
            tarTag = tar.tagName.toUpperCase();
        if (tarTag === "SPAN") {
            tar = ev.target.parentNode;
            $tar = $(tar);
        }

        var para = "num=" + $tar.attr("num") + "&name=" + escape($tar.attr("name"));
        window.open("/detail.html?" + para);
    });

    $bindPlan.remove(arguments.callee);
}
$bindPlan.add(bindLink);


function sendAjax() {
    $.ajax({
        url: "/getData?n=" + n,
        type: "get",
        dataType: "json",
        cache: false,
        success: function (jsonData) {
            if (jsonData) {
                total = jsonData["total"];
                $bindPlan.fire(jsonData["data"]);
            }
        }
    });
}
sendAjax();