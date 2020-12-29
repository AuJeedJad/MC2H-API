const passport = require('passport');
const router = require('express').Router();
const { getAnc, createAnc, updateAnc } = require('../controllers/anc');

const auth = passport.authenticate('jwt-staff', { session: false });

router.get('/', auth, getAnc);
router.post('/', auth, createAnc);
router.patch('/:id', auth, updateAnc);

module.exports = router;
