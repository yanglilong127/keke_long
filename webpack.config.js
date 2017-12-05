var path = require('path')
var webpack = require('webpack')
//创建html文件
const HtmlWebpackPlugin=require('html-webpack-plugin');
//提取css文件
const ExtractTextPlugin=require('extract-text-webpack-plugin');
const ExtractCSS=new ExtractTextPlugin({filename:'assets/css/[name].css'});

module.exports = {
  entry: {
    main:path.join(__dirname,'src/main.js'),
    swiper:path.join(__dirname,'src/assets/js/swiper.min.js'),
    jquery:path.join(__dirname,'src/assets/js/jquery-3.2.1.min.js'),
    viewer:path.join(__dirname,'src/assets/js/viewer.js'),
    lozad:path.join(__dirname,'src/assets/js/lozad.min.js')
  },
  output: {
    path:path.join(__dirname,'dist'),
    publicPath:'/',
    filename:'assets/js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use:ExtractCSS.extract([
          'css-loader',
          {
						loader:'postcss-loader',
						options: {
			                postcss: function(){
			                    return [
			                        require("autoprefixer")({
			                            browsers: ['ie>=8','>1% in CN']
			                        })
			                    ]
			                }
			            }
					}
        ]),
      },      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        use:[{
          loader:'babel-loader',
          options:{presets:['es2015']}
        }],
        exclude: /node_modules/
      },
      {
        test:/\.(eot|svg|ttf|woff|woff2)$/,
        loader:'file-loader',
        options:{
          limit:5000,
          name:'assets/font/[name].[ext]'
        }
      },
      {
        test:/\.(jpeg|jpg|gif|png|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/images/[name].[ext]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      vue:path.join(__dirname,'node_modules/vue/dist/vue.min.js'),
      "vue-router":path.join(__dirname,'node_modules/vue-router/dist/vue-router.min.js'),
      vuex:path.join(__dirname,'node_modules/vuex/dist/vuex.min.js'),
      axios:path.join(__dirname,'node_modules/axios/dist/axios.min.js'),
      jquery:path.join(__dirname,'src/assets/js/jquery-3.2.1.min.js'),
      bootstrapcss:path.join(__dirname,'src/assets/css/bootstrap.css'),
      mint_ui_css:path.join(__dirname,'src/assets/css/mint-ui.min.css')
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  plugins:[
    ExtractCSS,
    new HtmlWebpackPlugin({
      filename:'index.html',
      template:path.join(__dirname,'src/index.html'),
      inject:true,
      chunks:['swiper','jquery','lozad','viewer','main'],
      chunksSortMode: function (chunk1, chunk2) {
        var order = ['swiper','jquery','lozad','viewer','main'];
        var order1 = order.indexOf(chunk1.names[0]);
        var order2 = order.indexOf(chunk2.names[0]);
        return order1 - order2;  
      }
    }),
    //自动加载模块，当$被当作未赋值的变量时
    new webpack.ProvidePlugin({
      $:'jquery',
      jQuery:'jquery',
      'window.jQuery':'jquery',
      Vue:'vue'
    }),
    //（删除重复依赖的文件）
    new webpack.optimize.DedupePlugin(),
    /***
    new webpack.optimize.UglifyJsPlugin({
      sourceMap:true,
      compress:{
        warnings:false
      }
    }),
    **/
  ],
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devServer:{
    contentBase:__dirname+'/dist',
    //contentBase:__dirname+'/src',
  },
  watch:true
}
