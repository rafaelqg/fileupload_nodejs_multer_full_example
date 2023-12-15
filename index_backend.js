const express = require('express');
const multer = require('multer');
const fs = require('fs'); 
const app = express();
const uploadDirectory = 'uploads/';
app.listen(5333);


//for single file upload
const upload = multer({ dest: uploadDirectory})

app.post('/document_receiver',upload.single('my_attachment'),(req,res)=>{
  addCORSHeaderFields(res);
  console.log("Request fields overview:",req.file, req.body);
  fs.rename(req.file.path, uploadDirectory + req.file.originalname, ()=>{});
  res.status(200).json("uploaded completed: "+  req.file.originalname);
});

//for multiple files at once
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    cb(null,file.originalname);
  },
});

const uploadMulti = multer({ storage: storage });
app.post('/receiver_multiple_files',  uploadMulti.array("my_attachments") , (req, res) => {
  addCORSHeaderFields(res);
});

//support functions
const addCORSHeaderFields = function (res){
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500"); 
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, HEAD");
  res.setHeader("Access-Control-Allow-Headers", "X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept");   
  res.setHeader("Access-Control-Max-Age", "1728000");
}