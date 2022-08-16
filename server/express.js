const express = require('express');
const app = express();
const port = process.env.port||1004;

const mysql = require('mysql');
const {mysqlKey} = require('./mysqlKey.js');

const connection = mysql.createConnection(mysqlKey);
connection.connect();

app.get('/', (req, res)=>{
    return res.send("hello world!")
})

app.listen(port, ()=>{console.log(`server run in ${port}`)});