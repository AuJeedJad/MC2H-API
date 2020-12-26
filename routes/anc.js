const passport = require('passport');
const router = require('express').Router();
const { getAnc, createAnc } = require('../controllers/anc');

const auth = passport.authenticate('jwt-staff', { session: false });

router.get('/', auth, getAnc);
router.post('/', auth, createAnc);

module.exports = router;
