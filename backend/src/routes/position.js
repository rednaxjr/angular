const express = require('express')
const connection = require('../../dbconfig/dbconfig')
const router = express.Router();   


 
router.get('/', (req, res, next) => {
    var query = "Select * from position";
    connection.query(query, (err, result) => {
        if (!err) { 
            return res.json({ data: result })
        } else {
            return res.json({
                Message: "Error sql"
            })
        }
    })
    next();
});

router.post('/insertData', (req, res)=>{ 
    const data = req.body;  
    console.log(data) 
    var query = "INSERT INTO `position`(name) values (?)"; 
    connection.query(query, [data.name], (err, result)=>{
        if(!err){
            return res.json({
                data:result
            })
        }else{
            return res.json({
                err
            })
        }
    })  
})
 


module.exports = router;