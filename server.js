//引入http模块
var http = require('http');
//fs模块
var fs = require('fs');
http.createServer(function (req, res) {
    var pathname = req.url;
    if (pathname == '/') {
        pathname = '/index.html'; /*默认加载的首页*/
    }
    if (pathname != '/favicon.ico') {  /*过滤请求favicon.ico*/
        if (/css/.test(pathname)) {
            pathname = "." + pathname

        }else[
            pathname=   pathname.slice(1)
        ]
        console.log(pathname);
        //文件操作获取 static下面的index.html
        fs.readFile(pathname, function (err, data) {
            if (err) {  /*没有这个文件*/
                console.log('404');
                res.end(); /*结束响应*/
            } else { /*返回这个文件*/
                res.writeHead(200, { "Content-Type": "text/html;charset='utf-8'" });
                res.write(data);
                res.end(); /*结束响应*/
            }
        })
    }
}).listen(80, "0.0.0.0");

