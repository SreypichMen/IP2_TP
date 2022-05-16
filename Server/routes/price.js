const express = require('express');
const { createPrice, findAllPrice, deletePrice, updatePrice } = require('../services/price');
const router = express.Router();

router.post('/create', async(req, res) => {
    await createPrice(req.body, req, res);
})

router.get('/all', async(req, res) => {
    await findAllPrice(req, res);
})
router.delete('/delete', async(req, res) => {
    await deletePrice(req.body, req, res);
})
router.put('/update', async(req, res) => {
    await updatePrice(req.body, req, res);
})

module.exports = router;