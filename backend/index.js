var express = require('express');
var appConfig = require('./src/app.config');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(appConfig);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ 'message': err.message });
    return;
});

app.listen(process.env.PORT, () => {
    console.log("Running in Port:" + process.env.PORT);
})