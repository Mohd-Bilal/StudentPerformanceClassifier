var express = require('express');
var router = express.Router();
var ps = require('python-shell')

/* GET users listing. */
router.get('/', function(req, res, next) {
  var options = {
    args:
    [
      
    ]
  }
 ps.PythonShell.run('./resources/Student_Performance_Classifier/classifier.py',options,function(err,data){
   if(!err)
    res.send("Success"+data)
    else
    res.send("Error"+err)
 })


});

module.exports = router;
