require('dotenv').config(); 
require('../config/cloudinaryConfig')  
import express from 'express';
const app = express(); 
import multer from 'multer';  
import User from '../models/user';
import bcrypt from 'bcrypt';
const cloudinary = require('cloudinary').v2; 
const storage = multer({
  storage: multer.diskStorage({}), 
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/jpe|jpeg|png|gif$i/)) {
      cb(new Error('El archivo no es soportado'), false)
      // return 
    }
    cb(null, true)
  }
})

// app.post('/user', storage.single('image'),async (req, res,next) => {
app.post('/user', storage.single('image'),async function(req, res,next){
  // Code ES6
  try {   
    let body = req.body; 
    body.password = await bcrypt.hashSync(body.password,10);
    const result = await cloudinary.uploader.upload(req.file.path,{folder:'programmerTutorial/'});
    body.image = result.secure_url;
    const user = await User.create(body); 
    res.status(200).json(user);

  }catch(err){   
    res.status(500).send({  
       message: `An ocurred error ${err}`   
    })   
    next(err);  
  }           
});

export default app