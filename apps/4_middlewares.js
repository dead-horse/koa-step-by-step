var middlewares = require('koa-middlewares');
var path = require('path');
var koa = require('koa');

var app = koa();

// ejs render
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
  yield this.render('home', {
    user: { name: 'foo'}
  });
}

function* renderLogin() {
  yield this.render('login');
}

function* handleLogin() {
  this.redirect('/');
}

function* handleLogout() {
  this.redirect('/login');
}

app.listen(3000);
