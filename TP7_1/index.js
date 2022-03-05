const fs = require("fs")
const express = require('express');
const app = express();
app.get('/', function(req, res) {
    fs.readFile('crud_book.html', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        res.send(data)
    })
});

app.get('/detail', function(req, res) {
    fs.readFile('crud_book_1.html', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        res.send(data)
    })
});

app.listen(3000, () => {
    console.log("Your app is runing on http://localhost:3000");
})