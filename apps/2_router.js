var middlewares = require('koa-middlewares');
var koa = require('koa');

var app = koa();

// router
app.use(middlewares.router(app));

app.get('/', renderHome);
app.get('/login', renderLogin);
app.post('/login', handleLogin);
app.post('/logout', handleLogout);


function* renderHome() {
  this.body = 'home';
}

function* renderLogin() {
  this.body = 'login page';
}

function* handleLogin() {
  this.redirect = ('/');
}

function* handleLogout() {
  this.redirect('/');
}

app.listen(3000);
