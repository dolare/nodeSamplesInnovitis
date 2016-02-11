
# node.js 简介 #

javascript的运行环境 类似java中的jre1.7包之类的 

各系统node环境配置
[pc windows](http://jingyan.baidu.com/article/a948d6515d4c850a2dcd2e18.html)
[mac os](http://jingyan.baidu.com/article/a948d65102bdec0a2ccd2e67.html)
[linux centOS](http://jingyan.baidu.com/article/f0e83a25a434ac22e4910166.html)  
  
<br>

# 将node作为环境使用 #

## 利用[npm](https://www.npmjs.com/)（neapolitan pasta maker）package manager for javascript 来安装项目所依赖的各种包 ##
  
 npm类比maven的pom.xml文件  [npm常用命令用法](http://www.slideshare.net/wantingj/npm-46801372)

 常用前端工具：

1. [bower](https://www.npmjs.com/package/bower)：Bower offers a generic, unopinionated solution to the problem of front-end package management 

2. [gulp](https://www.npmjs.com/package/gulp):helps you automate painful or time-consuming tasks in your development workflow.
>[JShint](http://jshint.com/) [uglifyJS](http://lisperator.net/uglifyjs/) Minification

3. [yeoman](http://yeoman.io/migrate.html):a generic scaffolding system allowing the creation any kind of app.



#把javascript 作为服务器端语言放在node上运行#

概念：异步和同步 callback function
		
	//callback function		
	setTimeout(function(){
	  console.log('callback is called');
	},2000);
	
	var callBack = function(err,data){
	  return err;
	}

	//why we need asynchronous
	//消耗时间为M
	getData('from_db');
	// 消耗时间为N
	getData('from_remote_api');
	/*.......................*/
	getData('from_db', function (result) {
	// 消耗时间为M
	});
	getData('from_remote_api', function (result) {
	// 消耗时间为N
	});

>单线程同步编程模块会阻塞i/O导致资源得不到充分利用 多线程编程模型因为死锁、状态同步等让开发者头痛
>node利用单线程 远离多线程死锁状态同步等问题 利用异步i/o 更好的利用cpu



类比java官方API node官方API 

Node模块的实现：require 类比 java中 import

	//查看操作系统平台
	var os = require("os");
	var result = os.platform();
	console.log(result);

	//

核心模块：fs http path buffer、

fs：

	/fs模块提供writeFile函数，可以异步的将数据写入一个文件, 如果文件已经存在则会ti换。
	//fs.writeFile(filename, data, callback)
	var fs= require("fs");
	fs.writeFile('test.txt', 'Hello Node', function (err) {
	   if (err) throw err;
	   console.log('Saved successfully'); //文件被保存
	});
	
	//fs模块中还有appendFile函数，它可以将新的内容追加到已有的文件中，如果文件不存在，则会创建一个新的文件。
	//fs.appendFile(文件名,数据,编码,回调函数(err));
	fs.appendFile('test.txt', 'data to append', function (err) {
	   if (err) throw err;
	    //数据被添加到文件的尾部
	    console.log('The "data to append" was appended to file!'); 
	});
	
	//检查一个文件是否存在 fs.exists(文件，回调函数(exists));
	fs.exists('/etc/passwd', function (exists) {
	  console.log(exists ? "存在" : "不存在!");
	});
	
	//修改文件名称  fs.rename(旧文件，新文件，回调函数(err){});
	
	//移动文件也是我们经常会遇见的，可是fs没有专门移动文件的函数，但是我们可以通过rename函数来达到移动文件的目的
	//fs.rename(oldPath,newPath,function (err) {});
	
	//使用fs模块读取文件  fs.readFile(文件,编码,回调函数);
	
	//node.js中如何创建目录 rmdir函数可以删除指定的目录
	//fs.mkdir(路径，权限，回调函数(err)); fs.rmdir(路径，回调函数(err));
	
	//readdir函数可以读取到指定目录下所有的文件  fs.readdir(目录,回调函数(err,files));

buffer:
	
	var str = "你好node.js";
	var buf = new Buffer(str, 'utf-8');
	console.log(buf);//0 - 255

	var buf = new Buffer(100);
	console.log(buf.length); // => 100
	
	buf[21] = 300;
	console.log(buf[21]); // 44
    
	buf.write(string, [offset], [length], [encoding]) buffer.toString()  
	
	//shuchu test.md
	var fs = require('fs');
	var rs = fs.createReadStream('test.md');//var rs = fs.createReadStream('test.md', {highWaterMark: 11});
	var data = '';
	rs.on("data", function (chunk){
	data += chunk;//data = data.toString + chunk.toString
	});
	rs.on("end", function () {
	console.log(data);
	});

其他：

	// ........................... path优化 path模块的基本用法  ........................... 

	//normalize函数将不符合规范的路径经过格式化转换为标准路径,解析路径中的.与..外，还能去掉多余的斜杠。
	var path = require('path');  
	var data = path.normalize('/path///normalize/hi/..');
	console.log(data);
	
	//join函数将传入的多个路径拼接为标准路径并将其格式化，返回规范后的路径，避免手工拼接路径字符串的繁琐. 
	var data = path.join('///you', '/are', '//beautiful');
	console.log(data);
	
	//dirname函数用来返回路径中的目录名
	var data = path.dirname('/foo/strong/cool/nice'); 
	console.log(data);
	
	//basename函数可返回路径中的最后一部分，并且可以对其进行条件排除
	//例1：path.basename('路径字符串');例2：path.basename('路径字符串', '[ext]')<排除[ext]后缀字符串>;
	var data1 = path.basename('/foo/strong/basename/index.html');
	var data2 = path.basename('/foo/strong/basename/index.html','.html');
	console.log(data1 + ' "and" ' + data2);
	
	//extname函数返回路径中文件的扩展名(以最后一个'.'开始,返回'.'以及'.'以后的所有字符串,如没有'.',则返回空字符串).
	var data = path.extname('index.html');
	console.log(data);
	
	// ........................... 字符串转换 Query String模块的基本介绍  ...........................
	
	//stringify函数的作用就是序列化对象，也就是说将对象类型转换成一个字符串类型（默认的分割符（"&"）和分配符（"="））
	var querystring= require('querystring');
	var result = querystring.stringify({foo:'bar',cool:['xux', 'yys']});
	console.log(result);
	//querystring.stringify("对象"，"分隔符"，"分配符")
	var result = querystring.stringify({foo:'bar',cool:['xux', 'yys']},'*','$');
	console.log(result);//'foo$bar*cool$xux*cool$yys'
	
	//parse函数的作用就是反序列化字符串（默认是由"="、"&"拼接而成），转换得到一个对象类型
	var result = querystring.parse('foo=bar&cool=xux&cool=yys');
	console.log(result); //{ foo: 'bar', cool: ['xux', 'yys']}
	//querystring.parse("字符串"，"分隔符"，"分配符")  
	var result = querystring.parse('foo@bar$cool@xux$cool@yys','@','$');
	console.log(result);//{ foo: '', bar: 'cool', xux: 'cool', yys: '' }
	



http:
	
	var http = require('http');
	http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello World\n');
	}).listen(1337, '127.0.0.1');
	console.log('Server running at http://127.0.0.1:1337/');

	//客户端发起请求
	$ curl -v http://127.0.0.1:1337
	//三次握手
	* About to connect() to 127.0.0.1 port 1337 (#0)
	* Trying 127.0.0.1...
	* connected
	* Connected to 127.0.0.1 (127.0.0.1) port 1337 (#0)
	//客户端发送请求报文
	> GET / HTTP/1.1
	> User-Agent: curl/7.24.0 (x86_64-apple-darwin12.0) libcurl/7.24.0 OpenSSL/0.9.8r zlib/1.2.5
	> Host: 127.0.0.1:1337
	> Accept: */*

	//服务器响应后发向客户端发送相应内容 包括：响应头和响应体
	< HTTP/1.1 200 OK
	< Content-Type: text/plain
	< Date: Sat, 06 Apr 2013 08:01:44 GMT
	< Connection: keep-alive
	< Transfer-Encoding: chunked
	<
	Hello World
	//结束对话
	//* Connection #0 to host 127.0.0.1 left intact
	* Closing connection #0
	

<无需apache等service环境


## node.js 4.0 web框架  express Koa 











	

	

	















	



