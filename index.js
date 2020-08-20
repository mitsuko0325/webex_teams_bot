const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()
// app.use(bodyParser.urlencoded({extended: false}))
// ここjsonにしたらデータ取れました
// headerでcontent-typeでjson指定したからそのへんが原因説？
app.use(bodyParser.json())


// TODO:
// ngrokのURLをtargetUrl, HeaderのAuthorizationをbotのACCESS_TOKENにしてwebhookを作り直す
// ↑Postmanからやるべし


app.get('/',(req, res)=>{

    res.send({
        message:'get, index.js'
    })

})

app.post('/',(req, res)=>{

    // botを使ってメッセージに返信する
    var data = JSON.stringify(
            {"roomId":res.req.body.data.roomId, "text":"hi this is from index.js"}
        );
    
    // BearerはBOT＿ACCESS_TOKEN
    // GitHubに上げた時に消したんであとで書き足すべし
    var config = {
        method: 'post',
        url: 'https://webexapis.com/v1/messages',
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': "Bearer "
        },
        data : data
    };

    axios(config).then(function (response) {

        console.log(JSON.stringify(response.data));
    }).catch(function (error) {

        console.log(error);
    });

})

app.listen(process.env.PORT || 3000)
