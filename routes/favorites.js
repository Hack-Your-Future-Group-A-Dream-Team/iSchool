const express = require('express');
const controllers = require('../controllers/favorites');

const router = express.Router();

router.route('/').put(controllers.saveFavorite)
                 .get(controllers.getFavorites);


module.exports = { favorites: router };