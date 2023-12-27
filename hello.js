const http=require("http");
const port=3000;
const server=http.createServer(function(req,res){
    res.setHeader("content-type","application/json");
    res.end(JSON.stringify({text:"hi",numbers:[1,2,3]}))
});
server.listen(port);

console.log("server listening");