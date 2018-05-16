const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const ExtractTextPlugin = require("extract-text-webpack-plugin");//webpack4废弃
// const extractCSS = new ExtractTextPlugin('stylesheets/[name]-one.css');
// const extractLESS = new ExtractTextPlugin('stylesheets/[name]-two.css');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');//webpack4废弃

module.exports = {
    entry:{
        'common':['./src/lib/common/enter.js'],
        'main':['./src/lib/modules/main/main.js'],
        'expends':['./src/lib/modules/expends/expends.js'],
        'expends-form':['./src/lib/modules/expends/expends-form.js'],
        'expends-table':['./src/lib/modules/expends/expends-table.js'],
        'expendsAdd':['./src/lib/modules/expends/expendsAdd.js'],
        'expendsUpdate':['./src/lib/modules/expends/expendsUpdate.js'],
        'expendsDetails':['./src/lib/modules/expends/expendsDetails.js']
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'src/js/[name].js'
    },
    resolve:{
        modules:[path.join(__dirname, "src"),
            "node_modules"],
        alias:{
            
        }
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:'src/page/expends/expends.html',
            chunks:['common','expends','expends-form','expends-table'],
            template:'./src/page/expends/expends.html'
        }),
        new HtmlWebpackPlugin({
            filename:'index.html',
            chunks:['common','main'],
            template:'./index.html'
        }),
        new HtmlWebpackPlugin({
            filename:'src/page/expends/expendsAdd.html',
            chunks:['expendsAdd'],
            template:'./src/page/expends/expendsAdd.html'
        }),
        new HtmlWebpackPlugin({
            filename:'src/page/expends/expendsUpdate.html',
            chunks:['expendsUpdate'],
            template:'./src/page/expends/expendsUpdate.html'
        }),
        new HtmlWebpackPlugin({
            filename:'src/page/expends/expendsDetails.html',
            chunks:['expendsDetails'],
            template:'./src/page/expends/expendsDetails.html'
        }),
        // new UglifyJSPlugin(),webpack<4
        // new ExtractTextPlugin('style.css')
        new MiniCssExtractPlugin({
            filename: "src/css/[name].css",
            chunkFilename: "[id].css"
        })

    ],
    module:{
        rules:[
            {
                test:/\.css$/,
                // use:['style-loader','css-loader']
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test:/\.less$/,
                use:[{
                    loader:'style-loader'
                },{
                    loader:'css-loader'
                },{
                    loader:'less-loader'
                }]

            },{
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            use:['url-loader']
        },{
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            use:['url-loader']
        },{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }

        ]
    },  
    devServer:{
        hot:true,
        inline:true,
        disableHostCheck:true,
        host:'127.0.0.1',
        proxy:{
            "http://127.0.0.1:8080":{
                target:"http://47.104.23.245:80",
                changeOrigin: true,
                secure: false
            }
        }
    }
}   

