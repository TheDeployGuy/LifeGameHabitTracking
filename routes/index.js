var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/saveHabits', function(req,res){
  req.body.forEach(function(entry){
    console.log(entry.habit);
    // save to database...
    });
});

module.exports = router;
