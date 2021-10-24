
/* File name - app.js, 
            Student’s Name - Sofia Mehta, 
            StudentID - 301171210, 
            Date  3rd October 2021*/


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var flash = require('connect-flash');

const bodyParser = require('body-parser'); // parser middleware
const session = require('express-session');  // session middleware
const passport = require('passport');  // authentication
const LocalStrategy = require('passport-local').Strategy;


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


// MongoDb setup
mongoose.connect("mongodb+srv://sofiamehta03:hello123@cluster0.y4iwv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));



var User = require('./model/user.js');
const router = require('./routes/index');
const user = require('./model/user.js');


var app = express();
const port = 3000;

// Configure Sessions Middleware
app.use(session({
  secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Flash setup
app.use(flash());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// passport 

app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/users', usersRouter);

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



passport.use(new LocalStrategy(
  function(email, password, done) {
    User.findOne({ username: email }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password != password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      console.log(user);
      return done(null, user);
    });
  }
));

passport.serializeUser((user, done)=> {
  if (user) {
    return done(null, user.id);
  }
  return done(null, false);
});

passport.deserializeUser((id,done) => {
  user.findById(id, (err, user) => {
    if(err) return done(null, false);
    return done(null,user);
  })
});

function isAuthenticated(req, res, done){
  if(req.user){
    return done();
  }
  return res.redirect('/users/login')
}




router.post('/login',
  passport.authenticate('local', { failureRedirect: '/users/login', failureFlash: true }),
  function(req, res) {
    res.redirect('/Dashboard');
  });

module.exports = app;
