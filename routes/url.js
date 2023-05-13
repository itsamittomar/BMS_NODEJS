const express = require('express');
const CityController = require('../Controller/CityController');

const router = express.Router()

const cityController = new CityController()
cityController.register(router)


module.exports = router;
