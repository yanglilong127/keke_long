const path=require('path');
const express=require('express');
const httpProxyMiddleware=require('http-proxy-middleware');

const server=express();

const proxyTable={
		// 搜索接口
        "/songsearch": {
            target: "http://songsearch.kugou.com/song_search_v2",
            changeOrigin: true,
            pathRewrite: {
                "^/songsearch": ""
            }
        },
        // 获取歌曲接口
        "/play": {
            target: "http://www.kugou.com/yy/index.php",
            changeOrigin: true,
            pathRewrite: {
                "^/play": ""
            }
        },
        // 搜索框关键词搜索接口
        "/searchtip": {
            target: "http://searchtip.kugou.com/getSearchTip",
            changeOrigin: true,
            pathRewrite: {
                "^/searchtip": ""
            }
        }
	}

// config exress server proxy
Object.keys(proxyTable).forEach(ctx => {
    let options = proxyTable[ctx];
    if(typeof options === 'string') {
        options = { target: options }
    }
    server.use(httpProxyMiddleware(options.filter || ctx, options));
});

server.listen(8082,(err)=>{
	if(err){
		console.log(err);
		throw err;
	}else{
		console.log('成功监听8082端口.');
	}
});

//静态文件放置位置，即根目录
server.use(express.static('./dist'));