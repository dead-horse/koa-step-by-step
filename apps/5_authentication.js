var middlewares = require('koa-middlewares');
var path = require('path');
var fs = require('co-fs');
var koa = require('koa');

var app = koa();

// ejs
middlewares.ejs(app, {
  root: path.join(__dirname, 'views'),
  layout: false
});

app.use(middlewares.bodyParser());

// for signed cookie
app.keys = ['i', 'am', 'secret'];
app.use(middlewares.session());

// router
app.use(middlewares.router(app));
app.get('/', renderHome);
app.get('/login', renderLogin);
app.post('/login', handleLogin);
app.get('/logout', handleLogout);


function* renderHome() {
  if (!this.session.user) {
    return this.status = 403;
  }

  yield this.render('home', {
    user: this.session.user
  });
}

function* renderLogin() {
  yield this.render('login');
}

function* handleLogin() {
  var username = this.request.body.username;
  var password = this.request.body.password;

  var user = yield fs.readFile(path.join(__dirname, 'user.json'));
  user = JSON.parse(user);

  if (user[username] !== password) {
    return this.status = 400;
  }

  this.session.user = {
    name: username
  };

  this.redirect('/');
}

function* handleLogout() {
  this.session = null;
  this.redirect('/login');
}

app.listen(3000);
