const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const helmet = require('helmet');
const fileUpload = require('express-fileupload');

app.set('port', process.env.PORT || 3000);

app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());


let dir = `./uploadImg/`;

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
} else {
    console.log("Directory already exist");
}


require('./routes.js')(app);

process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at:', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});

process.on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
});

app.listen(app.get('port'), () => {
    console.log( 'Express запущенний на http://localhost:' +
        app.get('port') + '; нажміть Ctrl+C для завершення.' );
});