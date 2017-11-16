var express = require('express');
var bodyParser = require('body-parser');
var cookie = require('cookie-parser');
var session = require('express-session');
var ejs = require('ejs');
var app = express();

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());

app.use(cookie('sessiontest'));
app.use(session({
    secret: 'sessiontest',
    cookie: {
        maxAge: 60 * 1000
    },
    resave: false,
    saveUninitialized: true
    //cookie: { secure: false }
}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.use(express.static('public'));


var getArgs = function(req){
    if(req.session.name){
        name = req.session.name;
        var args = {
            isLogin:true,
            name: name
        }
    } else {
        var args = {
            isLogin:false
        }
    }
    return args;
}

app.get('/', function (req, res) {
    
    res.render(__dirname + "/pages/index.html", getArgs(req));
})

app.get('/index.html', function (req, res) {
    res.render(__dirname + "/pages/index.html", getArgs(req));
})

app.get('/CMS.html', function (req, res) {
    res.render(__dirname + "/pages/CMS.html", getArgs(req));
})
app.get('/introduce.html', function (req, res) {
    res.render(__dirname + "/pages/introduce.html", getArgs(req));
})
app.get('/loyin.html', function (req, res) {
    res.render(__dirname + "/pages/loyin.html", getArgs(req));
})
app.get('/master.html', function (req, res) {
    res.render(__dirname + "/pages/master.html", getArgs(req));
})
app.get('/movie.html', function (req, res) {
    res.render(__dirname + "/pages/movie.html", getArgs(req));
})
app.get('/photo.html', function (req, res) {
    res.render(__dirname + "/pages/photo.html", getArgs(req));
})
app.get('/signup.html', function (req, res) {
    res.render(__dirname + "/pages/signup.html", getArgs(req));
})
app.get('/type.html', function (req, res) {
    res.render(__dirname + "/pages/type.html", getArgs(req));
})

var user = {
    "admin": 'admin'
}


app.post('/login', function (req, res) {

    var name = req.body.username;
    var p = req.body.password;
    var password = user[name];
    if (password && password === p) {
        req.session.name = name;
        res.sendFile(__dirname + "/pages/index.html");
    } else {
        res.sendFile(__dirname + "/pages/loyin.html");
    }
})


app.listen(8888, function () {
    console.log('服务器已启动');
});