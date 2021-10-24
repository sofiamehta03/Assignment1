var express = require('express');
const passport = require('passport');
var router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('login', {message: req.flash('error')});
});
module.exports = router;
