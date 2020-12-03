const router = require('express').Router();
const { updateNote, getCurrentPregnancy, getCurrentPregnancy1 } = require('../controllers/currentPregnancy');

router.patch('/note/:id', updateNote);
router.get('/:id', getCurrentPregnancy);
// router.get('/', getCurrentPregnancy1);

module.exports = router;
