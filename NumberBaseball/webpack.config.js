const path = require("path");
const RefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
    name: "number-baseball-dev",
    mode: "development", //실서비스 : production
    devtool: "eval",
    resolve: {
        extensions: [".js",".jsx"]
    },

    entry: {
        app:["./client"],       //WordRelay.jsx는 client에서 자동으로 불러옴
    },//입력

    module: {   // 엔트리에 들어 있는 파일에 어떤 규칙을 적용할 지
        rules: [{
            test: /\.jsx?/,     //js 와 jsx의 파일에 적용한다
            loader: "babel-loader",     //babel-loader 사용한다.
            options: {          //옵션은 얘네다
                presets:[["@babel/preset-env",{
                    targets:{
                        browsers:['> 5% in KR'],
                    },
                    debug:true,
                }],
                "@babel/preset-react",
            ],
            plugins: [
                "react-refresh/babel"
            ]},
            exclude: path.join(__dirname,"node_modules"),
        }]
    },
    plugins: [
        new RefreshWebpackPlugin(),
    ],
    output: {
        path: path.join(__dirname,"dist"),
        filename: "app.js",
        publicPath: "/dist"         //가상경로
    },//출력
    devServer: {
        devMiddleware:{publicPath:"/dist"},     //웹펙 파일들이 생성되는 경로
        static:{directory:path.resolve(__dirname)},//실제파일들 경로
        hot:true
    },
};