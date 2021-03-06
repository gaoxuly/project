function ajax(options){
    var _default={
        type:"get",
        url:"",
        async:true,
        data:null,
        success:null
    };
    for(var key in options){
        if(options.hasOwnProperty(key)){
            _default[key]=options[key];
        }
    }
    var xhr=new XMLHttpRequest;
    xhr.open(_default.type,_default.url,_default.async);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&/^2\d{2}$/.test(xhr.status)){
            var data="JSON" in window?JSON.parse(xhr.responseText):eval("("+xhr.responseText+")");
            if(typeof _default.success === "function"){
                _default.success(data);
            }
        }
    };
    xhr.send(_default.data);
}
