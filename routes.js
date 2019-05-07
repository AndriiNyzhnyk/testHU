module.exports = (app) => {
    // routes for web page

    app.post('/upload', (req, res) => {
        if (Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }
        
        // console.log(req.files);
        let sampleFile = req.files.file;
        let partNameArr = sampleFile.name.split('.');

        let oldName = partNameArr[0];
        let extension = partNameArr[partNameArr.length - 1];
        let newName = `${oldName}_${new Date()}`;
        let pathToDir = `${__dirname}/uploadImg/`;
        let destination = `${pathToDir}/${newName}.${extension}`;

        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv(destination, (err) => {
            if (err) return res.status(500).send(err);

            res.send('File uploaded!');
        });
    });


    // 404 Error Handler
    app.use((req, res, next) => {
        res.status(404).send('Page not found');

    });

    // 500 Error Handler
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Internal Server Error');

    });
};