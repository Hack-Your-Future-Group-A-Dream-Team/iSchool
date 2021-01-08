const express = require('express');
const controllers = require('../controllers/interaction_controller');

const router = express.Router();

router.route('/').post(controllers.addScore);


module.exports = router;