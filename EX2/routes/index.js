var express = require('express');
const { login } = require('../services/login');
const { register } = require('../services/register');
var router = express.Router();

router.post('/login', async(req, res)=>{
    const {email, password} = req.body

    const result = await login(email, password)
     res.json(result);
 
 })
 // /detail
 router.post('/register', async(req, res)=>{

     const result = await register(req.body)
     res.json(result)
      
 })
 module.exports = router;
 