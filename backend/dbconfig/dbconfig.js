const mysql = require('mysql2');
const fs = require('fs');
require('dotenv').config(); 
var connection  = mysql.createConnection({
    port:process.env.DB_Port,
    user:process.env.DB_Username,
    host:process.env.DB_Host,
    password:process.env.DB_Password,
    database:process.env.DB_Name,
});

connection.connect((err) =>{
    if(!err){
        console.log("Connected") 
    }else{
        console.log("Not Connected")
        console.log(err)
    }
})
// connection.end()
module.exports = connection;