const express = require('express');
const cors = require('cors');
const connection = require('./Connection')
const col_users = require('./Databases/Users');

const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.post('/signup',(req,res) => {
    col_users.insertMany({
        username: req.body.uname, 
        password: req.body.pwd,
        fullname: req.body.name, 
        email: req.body.mail,
        avatar:"../Assests/Av1.jpg",
        played:0,
        wins:0,
        loses:0,
        coins:0,
        vouchers:[],
        coupons:[]
    }).then((res1) => {
        if(res1.length != 0){
            res.send({valid:true})
        }  
        else{
            res.send({valid:false})
        } 
    })
}) 

app.post('/login',(req,res) => {
    console.log(req.body)
    col_users.find({
        username: req.body.uname,
        password: req.body.pwd,
    }).then((res1) => {
        if(res1.length !== 0){
            res.send({valid:true})
        }  
        else{
            res.send({valid:false})
        } 
    })
})

app.post('/profile',(req,res) => {
    var uname = req.body.uname
    var pwd = req.body.pwd
    col_users.find({username:uname}).then((res1) => {
        res.send(res1);
    })
}) 

app.post('/win',(req,res) => {
    const uname = req.body.uname
    const win = req.body.win
    const type = req.body.type;
    const won = req.body.won;
    console.log(won)
    if(type === "vouchers"){
        col_users.findOneAndUpdate({username:uname},{$push:{vouchers:win},$inc:{played:1,wins:1}},{new:true,writeConcern: { w: 'majority' }})
        .then(response => {
            console.log(response);
        })        
    }else if(type==="coins"){
        col_users.findOneAndUpdate({username:uname},{$inc:{coins:win,played:1,wins:1}},{new:true,writeConcern: { w: 'majority' }})
        .then(response => {
            console.log(response);
        })
    }
        res.send({flag:true})
}) 
app.post('/lose',(req,res) => {
    const uname = req.body.uname
    col_users.findOneAndUpdate({username:uname},{$inc:{played:1,loses:1}},{new:true,writeConcern: { w: 'majority' }})
    .then(response => {
        console.log(response);
    })
})

app.post('/updated',(req,res) => {
    const {uname,won} = req.body
        col_users.findOneAndUpdate({username:uname},{$inc:{played:1},$inc:{loses:1}},{new:true,writeConcern: { w: 'majority' }})
        .then(response => {
            console.log(response);
        })
})

app.listen(8888,() => {
    console.log("Listening on PORT 8888");
})