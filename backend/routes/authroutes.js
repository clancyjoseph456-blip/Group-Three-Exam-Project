// routes/authRoutes.js
const express = require('express');
const { register, login } = require('./controllers/authcontroller.js');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;
const ratelimit=
requre('express-rate-limit');
const apilimiter:15*60*1000,//15minutes
  max:20, //limit reach IP to 20
requests per window
message"too many login attempts please try again after 15 minutes"});
router.post('/login', apilimiter,
login);
