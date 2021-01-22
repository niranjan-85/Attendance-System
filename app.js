const express = require('express');
const mongoose = require('mongoose');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const multer = require('multer');
const gridfs = require('multer-gridfs-storage');
const gridfs_stream = require('gridfs-stream');

const path = require('path')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// mongo-db connections;

const mongoURI = 'mongodb+srv://niranjanraje:<password>@cluster1.sk074.mongodb.net/<dbname>?retryWrites=true&w=majority';
const conn=mongoose.connect(mongoURI,{ useNewUrlParser: true} (req,res)=>{

});
let gfs;
conn.once('open',()=>{
    gfs = gridfs_stream(conn.db,mongoose.mongo);
    gfs.collection('faculty');
})


const storage = new gridfs({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
});
const upload = multer({ storage });


var schema = new mongoose.Schema(
    {
        firstName:String,
        LastName : String,
        ID : String,
    }
)

var Faculty = mongoose.model("NewFaculty",schema);

app.use(express.static('public'));
app.use(express.static('assets'));

app.use('/css',express.static(__dirname + 'public/css'));
app.use('/js',express.static(__dirname + 'public/js'));
app.use('/images',express.static(__dirname + 'assets/images'));

app.set('view engine','ejs');
app.set('views','./src/views');

const Routes = require('./src/Routes/routes');
const e = require('express');

app.get('/home',Routes);
app.get('/register',Routes);

var uploads = upload.array('img',2)
app.post('/upload', uploads , (req,res)=>{
    var obj = {
        firstName : req.body.fname,
        LastName : req.body.lname,
        ID : req.body.id,
    }
    Faculty.create(obj,(err,item)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log("chalra")
        }
    })
})

app.listen(PORT,()=>{
    console.log("Server Up and Running");
})