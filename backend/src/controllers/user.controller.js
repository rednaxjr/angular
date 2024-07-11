const connection = require('../../dbconfig/dbconfig')

const insertData = ((req, res) => {
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
});




module.exports = {
    insertData 
}