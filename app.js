const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(express.static('assets'));

app.use('/css',express.static(__dirname + 'public/css'));
app.use('/js',express.static(__dirname + 'public/js'));
app.use('/images',express.static(__dirname + 'assets/images'));

app.set('view engine','ejs');
app.set('views','./src/views');

const Routes = require('./src/Routes/routes');

app.get('/home',Routes);
app.get('/register',Routes);

app.listen(PORT,()=>{
    console.log("Server Up and Running");
})