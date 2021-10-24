var express = require('express');
const Contact = require('../model/Contact');
var router = express.Router();
const connectEnsureLogin = require('connect-ensure-login'); //authorization
const user = require('../model/user');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

function isAuthenticated(req, res, done){
  if(req.user){
    return done();
  }
  return res.redirect('/users/login')
}

router.post('/logout', function(req, res) {
  req.logOut();
  res.redirect('/users/login')
})

router.get('/dashboard',isAuthenticated, function (req, res, next) {
  // const user1 = new user({
  //   username:"sofiamehta@gmail.com",
  //   password:"Sachdeva@2002"
  // });
  // user1.save();

  Contact.find({}, (err, tasks) => {
    if (req.query['msg'] == "success") {
      req.query = "";
      res.render('dashboard', { success: true, contacts: tasks });
    }
    else {
      res.render('dashboard', { title: 'Dashboard', contacts: tasks });
    }
  })

});

router.route("/remove/:id").get((req, res) => {
  const id = req.params.id;
  Contact.findByIdAndRemove(id, err => {
    if (err) return res.send(500, err);
    res.redirect("/dashboard");
  });
});

router.route('/update/:id')
  .get((req, res) => {
    const id = req.params.id;
    Contact.findById(id, (err, tasks) => {
      if (err) return res.send(500, err);
      res.render('updateform', { data: tasks })
    })
  })
        .post((req, res) => {
          const id = req.params.id;
          Contact.findByIdAndUpdate(id, {
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email
          }).catch(err => console.log(err));
          res.redirect("/dashboard");
        });
    


    router.post('/saveContact', function (req, res, next) {
      const contact = new Contact({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
      });
      contact.save()
        .then(() => (console.log("Database created")))
        .catch(err => (console.log(err)));
      res.redirect('/dashboard?msg=success');
    })

    module.exports = router;
