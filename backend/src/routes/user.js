const express = require('express')
const connection = require('../../dbconfig/dbconfig')
const router = express.Router();



function getRandomInt(max) {
    // return Math.floor(Math.random() * max);
    return Math.random() * (max - 1) + 1;
}
router.get('/', (req, res, next) => {
    console.log("connected as")
    var query = "Select * from user";
    connection.query(query, (err, result) => {
        if (!err) {
            console.log(result);

            return res.json({ data: result })
        } else {
            return res.json({
                Message: "Error sql"
            })
        }
    })
});

//parameter
router.get('/:id', (req, res) => {
    console.log("aaa")
    var id = req.params.id;
    var query = "Select * from user where id=?";
    connection.query(query, [id], (err, result) => {
        if (!err) {
            return res.json({
                data: result
            })
        } else {
            console.log(err)
        }
    })
})

router.delete('/deleteById/:id', (req, res) => {
    console.log("aaa")
    var id = req.params.id;
    var query = "Delete from user where id=?";
    connection.query(query, [id], (err, result) => {
        if (!err) {
            return res.json({
                msg: "Data Successfully Deleted"
            })
        } else {
            console.log(err)
        }
    })
});

router.put('/update', (req, res) => { 
    const data = req.body; 
    var findUser = "Select * from user where id=?";

    var newData = [
        data.fname,
        data.lname,
        data.id
    ]

    connection.query(findUser, [data.id], (err, request) => {
        if (!err) {
            const oldData = request;
            var updateUser = "Update user set first_name=? , last_name=? where id = ?"
            connection.query(updateUser, newData, (err, result) => {
                if (!err) {
                    var updateUser = "Select * from user where id=?"
                    connection.query(updateUser, [data.id], (err, result) => {
                        if (!err) {
                            return res.json({
                                oldData: oldData,
                                msg: "Updated Successfully",
                                newData: result
                            })
                        }
                    })


                } else {
                    return res.json({
                        error: err
                    })
                }
            });

        } else {
            return res.json({
                msg: "User not Found"
            })
        }

    })
 
});

//post json
router.post('/insertData', (req, res) => {
    const data = req.body;
    var getAllPosition = "Select * from position";
    connection.query(getAllPosition, (err, result) => {
        if (!err) {
            positions = result;
            console.log(positions.length);

            var positionId = getRandomInt(positions.length);
            console.log(positionId)
            var query = "INSERT INTO user(first_name, last_name, positionId) values (?,?,?)";
            connection.query(query, [data.fname, data.lname, positionId], (err, result) => {
                if (!err) {
                    return res.json({
                        data: result
                    })
                } else {
                    return res.json({
                        err
                    })
                }
            })
        } else {
            return res.json({
                err
            })
        }
    })
})

router.delete('')


module.exports = router;