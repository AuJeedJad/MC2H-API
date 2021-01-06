const express = require('express');
const ultrasoundController = require('../controllers/ultrasoundController');
const { upload } = require('../middleware/upload');
const passport = require('passport');

const router = express.Router();
const authStaff = passport.authenticate('jwt-staff', { session: false });
router.post('/addImages', authStaff, upload.array('files', 10), ultrasoundController.addImages);
router.post('/addNewUsResult', authStaff, upload.array('files', 10), ultrasoundController.addNewUsResult);
router.patch('/editUsResult', authStaff, ultrasoundController.editUsResult);
router.get('/checkCorrectUs', authStaff, ultrasoundController.checkCorrectUs);
router.get('/getUltarsoundResult', authStaff, ultrasoundController.getUltarsoundResult);

module.exports = router;
