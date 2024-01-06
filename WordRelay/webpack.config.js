const path = require("path");
module.exports = {
    name: "word-relay-setting",
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
                presets:["@babel/preset-env","@babel/preset-react"],
            }
        }]
    },

    output: {
        path: path.join(__dirname,"dist"),
        filename: "app.js"
    }//출력
};