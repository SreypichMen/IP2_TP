const express = require('express')
const router = express.Router()
const datas = require('../module/users')
const email = require('email-validator')




router.get('/', async(req, res) => {
    try {
        const user = await users.find()
        res.json(user)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


router.get('/:id', (req, res) => {

})



router.post('/', async(req, res) => {

    const user = new users({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName
    })
    try {
        const isCorrect = email.validate(req.body.email);
        if (!isCorrect) {
            console.log("Wrong format! Please enter again!");
        } else {
            const User = await user.save()
            res.status(201).json(User)
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }

})
module.exports = router