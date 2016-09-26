var userName=document.getElementById("userName"),
    userAge=document.getElementById("userAge"),
    userPhone=document.getElementById("userPhone"),
    userAddress=document.getElementById("userAddress"),
    submit=document.getElementById("submit");
function queryURLParameter(){
    var obj={},
        curURL=window.location.href,
        reg=/([^?&=]+)=([^?&=]+)/g;
    curURL.replace(reg,function(){
        obj[arguments[1]]=arguments[2];
    });
    return obj;
}
var isAdd=true,
    urlObj=queryURLParameter();
if(typeof urlObj["id"]!=="undefined"){
    isAdd=false;
    ajax({
        url:"/getInfo?id="+urlObj["id"]+"&_="+Math.random(),
        type:"get",
        success:function(data){
            userName.value=data["name"];
            userAge.value=data["age"];
            userPhone.value=data["phone"];
            userAddress.value=data["address"];
        }
    });
}
submit.onclick=function(){
    var obj={};
    obj.name=userName.value.replace(/^ +| +$/g,"");
    obj.age=userAge.value.replace(/^ +| +$/g,"");
    obj.phone=userPhone.value.replace(/^ +| +$/g,"");
    obj.address=userAddress.value.replace(/^ +| +$/g,"");
    var objStr="";
    if(!isAdd){
        obj["id"]=urlObj["id"];
        objStr=JSON.stringify(obj);
        ajax({
            url:"/update",
            type:"post",
            data:objStr,
            success:function(data){
                alert(data["message"]);
                if(data["code"]==0){
                    window.location.href="index.html";
                }
            }
        });
        return;
    }
    objStr=JSON.stringify(obj);
    ajax({
        url:"/add",
        type:"post",
        data:objStr,
        success:function(data){
            alert(data["message"]);
            if(data["code"]==0){
                window.location.href="index.html";
            }
        }
    });
};
