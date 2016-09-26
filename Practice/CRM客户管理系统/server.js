//导入所需的模块
var http=require("http"),
    fs=require("fs"),
    url=require("url");
var suffixType=require("./nodeModule/suffixType");
//创建server服务
var reg=/\.(HTML|CSS|JS)/i;
var sv=http.createServer(function(req,res){
   //接收客户端的请求信息
    var urlObj=url.parse(req.url,true),
        pathname=urlObj.pathname,
        query=urlObj.query;
    //资源文件的处理
    if(reg.test(pathname)){
        try{
            var suffix=reg.exec(pathname)[1].toUpperCase();
            var suType=suffixType.getType(suffix);
            var conFile=fs.readFileSync("."+pathname,"utf-8");
            res.writeHead(200,{"content-type":suType+";charset=utf-8;"});
            res.end(conFile);
        }catch(e){
            res.writeHead(404,{"content-type":"text/plain;charset=utf-8;"});
            res.end("请求的资源文件不存在！");
        }
        return;
    }
    //数据接口请求的处理
    var path="./nodeModule/customInfo.json";
    //获取所有的客户信息
    if(pathname =="/getAllList"){
        var allList=fs.readFileSync(path,"utf-8");
        res.writeHead(200,{"content-type":"application/json;charset=utf-8"});
        res.end(allList);
    }
    //新增用户
    if(pathname =="/add"){
        var addTemp='';
        req.addListener("data",function(postCon){
            addTemp+=postCon;
        });
        req.addListener("end",function(){
            var con=fs.readFileSync(path,"utf-8");
            con=JSON.parse(con);
            addTemp=JSON.parse(addTemp);
            if(con.length===0){
                addTemp["id"]=1;
            }else{
                addTemp["id"]=parseFloat(con[con.length-1]["id"])+1;
            }
            con.push(addTemp);
            fs.writeFileSync(path,JSON.stringify(con),"utf-8");
            res.writeHead(200,{"content-type":"application/json;charset=utf-8;"});
            res.end(JSON.stringify({"code":0,"message":"创建成功！"}));
        });
        return;
    }
    //获取指定用户的详细信息
    if(pathname==="/getInfo"){
        var  con=fs.readFileSync(path,"utf-8");
        con=JSON.parse(con);
        var curObj=null;
        for(var i=0;i< con.length;i++){
            if(con[i]["id"]==query["id"]){
                curObj=con[i];
                break;
            }
        }
        if(!curObj){
            curObj={};
        }
        res.writeHead(200,{"content-type":"application/json;charset=utf-8;"});
        res.end(JSON.stringify(curObj));
        return;
    }
    //修改客户信息
    if(pathname=="/update"){
        var updateTemp="";
        req.addListener("data",function(chunk){
            updateTemp+=chunk;
        });
        req.addListener("end",function(){
            updateTemp=JSON.parse(updateTemp);
            var con=JSON.parse(fs.readFileSync(path,"utf-8"));
            for(var i=0;i<con.length;i++){
                var cur=con[i];
                if(cur["id"]==updateTemp["id"]){
                    con[i]=updateTemp;
                    break;
                }
            }
            fs.writeFileSync(path,JSON.stringify(con));
            res.writeHead(200,{"content-type":"application/json;charset=utf-8;"});
            res.end(JSON.stringify({"code":0,"message":"修改成功！"}));
        });
        return;
    }
    //删除客户信息
    if(pathname==="/remove"){
        var obj={
            "code":1,
            "message":"删除失败！"
        };
        con=JSON.parse(fs.readFileSync(path,"utf-8"));
        for(i=0;i<con.length;i++){
            if(con[i]["id"]===query["id"]){
                con.splice(i,1);
                fs.writeFileSync(path,JSON.stringify(con),"utf-8");
                obj={
                    "code":0,
                    "message":"删除成功！"
                };
                break
            }
        }
        res.writeHead(200,{"content-type":"application/json;charset=utf-8;"});
        res.end(JSON.stringify(obj));
    }
});
sv.listen(80);

