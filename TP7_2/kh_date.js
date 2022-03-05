const express = require('express');
const { readFile } = require('fs');
const app = express();

var path = require('path');
var public = path.join(__dirname, '');

app.get('/myscript', function(req, res) {
    res.sendFile(path.join(public, './myscript.js'));
});
app.use('/', express.static(public));

app.get("/", function(req, res) {
    readFile('./index.html', 'utf-8', (err, html) => {
        if (err)
            res.status(500).send(err);
        res.send(html);

    })
});
app.listen(3000, () => {
    console.log('Your app is available at http://localhost:3000');
});