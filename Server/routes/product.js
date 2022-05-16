const express = require('express');

const { create, productInEachItem, productById, removeById, update, productAll, productEach } = require('../services/product');
const router = express.Router();
const multer = require('multer');
// const upload = multer({ dest: "../Client/src/assets/uploads/" }).single('imageFile');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../Client/src/assets/uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '.png') //Appending .jpg
    }
})

const upload = multer({ storage: storage }).single('imageFile');


router.post('/add', upload, async(req, res) => {
    // console.log(req.file);
    await create(req.body, req.file, req, res);
})
router.get('/all', async(req, res) => {
    await productAll(req, res);
})
router.post('/each-shop', async(req, res) => {
    await productEach(req.body, req, res);
})
router.post('/each-item', async(req, res) => {
    await productInEachItem(req.body, req, res);
})
router.get('/id/:id', async(req, res) => {
    await productById(req.params, req, res);
})
router.delete('/delete', async(req, res) => {
    await removeById(req.body, req, res);
})
router.put('/update', async(req, res) => {
    await update(req.body, req, res);
})

module.exports = router;