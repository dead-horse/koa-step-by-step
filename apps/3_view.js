var middlewares = require('koa-middlewares');
var path = require('path');
var koa = require('koa');

var app = koa();

// router
app.use(middlewares.router(app));

// ejs
middlewares.ejs(app, {
  root: path.join(__dirname, 'views'),
  layout: false
});

app.get('/', renderHome);
app.get('/login', renderLogin);
app.post('/login', handleLogin);
app.post('/logout', handleLogout);


function* renderHome() {
  yield this.render('home', {
    user: { name: 'foo'}
  });
}

function* renderLogin() {
  yield this.render('login', {
    csrf: 'token'
  });
}

function* handleLogin() {
  this.redirect = ('/');
}

function* handleLogout() {
  this.redirect('/');
}

app.listen(3000);
