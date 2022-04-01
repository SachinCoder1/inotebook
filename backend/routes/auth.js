const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "switchisonforunlimitedtime"
const fetchUser = require('../middleware/authdata')

router.post('/signup', [
  body('name', 'Enter a valid name (minimum: 5 Characters)').isLength({ min: 5 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Enter a valid password (minimum: 6 Characters)').isLength({ min: 3 })

], async (req, res) => {
 let success= false
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }

  let user = await User.findOne({ email: req.body.email })
  if (user) {
    return res.status(400).json({ error: 'Please try again by entering unique value' })
  }
  const salt = await bcrypt.genSalt(10)
  const securePassword = await bcrypt.hash(req.body.password, salt)
  user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: securePassword
  })
  const dataId = {
    user: {
      id: user.id
    }
  }
  const authToken = jwt.sign(dataId, JWT_SECRET)
  console.log(authToken)
  success = true
  res.json({success, authToken})

})

// login

router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password').exists(),
], async (req, res) => {
  try {
    let success = false
    const { email, password } = req.body
    const errors = validationResult(req);
    let user = await User.findOne({ email })
    if (!user) {
      success = false
      return res.status(400).json({ error: 'please correct your login details!' });
    }
    let passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) {
      success = false
      return res.status(400).json({success, error: 'please correct your login details!' });
    }
    const dataId = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(dataId, JWT_SECRET)
    console.log(authToken)
    success = true
    res.json({success, authToken})
  } catch (error) {
    console.log('there is an error', error)
  }
})



router.post('/getUser', fetchUser, async (req, res) => {
  try {
    let userId = req.user.id
    let user = await User.findById(userId).select('-password')
    res.send(user)

  } catch (error) {
    console.log('there is an error')
  }
})


module.exports = router