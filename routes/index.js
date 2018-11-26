var express = require('express');
var router = express.Router();
var model = require('../models/login_credentials')
var bcrypt = require('bcrypt')
var multer = require('multer')
var upload = multer({dest:'uploads/'})
var ps = require('python-shell')

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Login' });
});
router.post('/api/login',function(req,res,next){
  model.create()
  res.json({
    "username":req.body.username,
    "password":req.body.password
  })
})
router.get('/register',function(req,res,next){
  res.render('register',{title:'Register'})
})

router.post('/api/register',function(req,res,next){
  const password = req.body.password
  const username = req.body.username
  bcrypt.hash(password,function(err,hash){
    if(err)
      res.render('error')
    else  
      model.create({
        "username":username,
        "password":password
      }).then(function(res){
        res.render('index',{title:'Login'})
      }).catch(function(err){
        res.render('error',{err})
      })
  })
  
})
router.post('/api/upload',upload.single('student'),function(req,res,next){
  const filepath = __basedir+'/'+req.file.path
  var options ={args:[filepath]}
   ps.PythonShell.run(__basedir+'/resources/Student_Performance_Classifier/classifier.py',options,function(err,data){
   if(!err)
    res.send("Success"+data)
    else
    res.send("Error"+err)
 })
})
router.get('/dashboard',function(req,res,next){
  res.render('dashboard',{title:'Dashboard'})
})
module.exports = router;
