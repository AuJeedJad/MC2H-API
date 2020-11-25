const router = require('express').Router();
const { DentalCare, DentalAppointment, DentalExam } = require('../controllers/dental');

router.post('/DentalCare', DentalCare);
router.post('/DentalAppointment', DentalAppointment);
router.post('/DentalExam', DentalExam);

module.exports = router;
