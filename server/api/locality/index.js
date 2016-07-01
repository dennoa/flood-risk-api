const router = require('express').Router();

router.use(require('express-validator')());
router.post('/search', require('./search'));

module.exports = router;