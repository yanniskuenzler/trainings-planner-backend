const express = require('express');
const router = express.Router();

const HelloWorld = require('../controllers/HelloWorldController.js');

router.get('/', HelloWorld);

module.exports = router;
