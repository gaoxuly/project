function getType(suffix){
    var type="text/plain";
    switch (suffix){
        case "HTML":
            type="text/html";
            break;
        case "CSS":
            type="text/css";
            break;
        case "JS":
            type="text/js";
            break;
    }
    return type;
}
module.exports.getType=getType;
