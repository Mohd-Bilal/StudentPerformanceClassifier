var express = require('express');
var router = express.Router();
var model = require('../models')
var bcrypt = require('bcrypt')
var multer = require('multer')
var upload = multer({dest:'uploads/'})
var ps = require('python-shell')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login' });
});
router.post('/error',function(req,res,next){
  res.render('error',{error:"err"})
})
router.post('/api/login',function(req,res,next){
  const username = req.body.username
  const password = req.body.password
  console.log(username)
  model.login_credentials.findOne(
    {
      where:{
      username:username
      }
    }
  ).then(function(resp){
    bcrypt.compare(password,resp.password,function(err,result){
      if(!err)
        res.redirect('/dashboard')
      else {
        console.log(err)
        res.redirect('/error') 
        
        }
    })
  }).catch(function(err){
    res.redirect('/error')
    console.log(err)
  })
})
router.get('/register',function(req,res,next){
  res.render('register',{title:'Register'})
})

router.post('/api/register',function(req,res,next){
  const password = req.body.password
  const username = req.body.username
  const firstname = req.body.firstname
  const lastname = req.body.lastname
  const saltrounds = 10;
  bcrypt.hash(password,saltrounds,function(err,hash){
    if(err)
      res.render('error',{error:err})
    else  
      model.login_credentials.create({
        "username":username,
        "password":hash,
        "firstname":firstname,
        "lastname":lastname
      }).then(function(result){
        res.redirect('/')
      }).catch(function(err){
        console.log(err+"Hello")
        res.redirect('/register')
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
