var express = require('express');
var cors = require('cors');
require('dotenv').config()

var app = express();
const multer = require('multer');

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const upload = multer({ dest: './data/uploads/' , limits:{fileSize:1000000}}) //1MB file size
app.post('/api/fileanalyse',upload.any(),(req,res)=>{
  
  let { originalname = '', mimetype = '', size = 0 } = req.files[0] || {};
  return res.json({
    "name":originalname,
    "type":mimetype,
    "size":size

  })
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
