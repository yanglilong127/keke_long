酷狗MP3链接需要两个接口获取：
hash获取接口： http://songsearch.kugou.com/song_search_v2
MP3获取接口： http://www.kugou.com/yy/index.php

1.获取hash的接口
拿周杰伦的来说： http://songsearch.kugou.com/song_search_v2?callback=jQuery19107655316341116605_1497970603262&keyword=%E5%91%A8%E6%9D%B0%E4%BC%A6&page=1&pagesize=1&userid=-1&clientver=&platform=WebFilter&tag=em&filter=2&iscorrection=1&privilege_filter=0
  注释：

      callback=jQuery19107655316341116605_1497970603262 可以删掉，方便；

      keyword=%E5%91%A8%E6%9D%B0%E4%BC%A6  歌手或者歌曲名字；

      clientver=&platform=WebFilter 必须存在不知道什么意思；

      page=1 页数；
    其余参数未测试或未发现实际意义自行测试，可有可无

     其中FileHash为MP3的 hash，把它和 AlbumID 拿出来
2.获取MP3链接的接口

周杰伦的告白气球：http://www.kugou.com/yy/index.php?r=play/getdata&hash=3C3D93A5615FB42486CAB22024945264&album_id=1645030&_=1497972864535

 注释：  
      &hash=3C3D93A5615FB42486CAB22024945264  上面拿出来的hash；

      &album_id=1645030 上一步拿出来的AlbumID ；
      最后一个&_下划线参数的值为时间戳

    注释： play_url 就是获取到MP3的链接。
    ##实际上只需要传值参数hash就可以
    http://www.kugou.com/yy/index.php?r=play/getdata&hash=3C3D93A5615FB42486CAB22024945264

    例如：http:\/\/fs.w.kugou.com\/201712011057\/5228701fc66e75cec0775fef553d7533\/G059\/M02\/17\/1D\/ew0DAFdr9KmAf5GnADSkTnjFCm0437.mp3
    最后要将反斜杠去掉

还有一个API是关于获取搜索列表的，自动获取下拉选项的
http://searchtip.kugou.com/getSearchTip
例如：   http://searchtip.kugou.com/getSearchTip?keyword=aaaa


获取数据可以用ajax的jsonp获取：
$.ajax({
  url:' http://songsearch.kugou.com/song_search_v2?keyword=%E5%91%A8%E6%9D%B0%E4%BC%A6&page=1&pagesize=1&userid=-1&clientver=&platform=WebFilter&tag=em&filter=2&iscorrection=1&privilege_filter=0',
  type:'get',
  data:{},
  dataType:'jsonp',
  success:function(data){
    console.log(data);
  }
})

注：