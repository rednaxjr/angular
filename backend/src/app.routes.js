var express = require('express'); 
var router = express.Router(); 
const user = require("./routes/user");
const position = require("./routes/position");
 
router.use('/user', user);
router.use('/positions', position);

router.use('/', (req, res) => {  res.sendFile('./views/index.html', { root: __dirname }); });

router.use((req, res) => { res.status(404).sendFile('./views/404.html', { root: __dirname }); });
 

module.exports = router;