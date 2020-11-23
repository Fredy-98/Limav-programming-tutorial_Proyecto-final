require('dotenv').config(); 
require('../config/cloudinaryConfig')  
import express from 'express';
const app = express(); 
import multer from 'multer';  
import Tutorial from '../models/tutorialVideo';
const cloudinary = require('cloudinary').v2; 
const storage = multer({
  storage: multer.diskStorage({}), 
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/mp4||mkv|gif$i/)) {
      cb(new Error('El archivo no es soportado'), false)
      // return 
    }
    cb(null, true)
  }
})

app.post('/tutorial', storage.single('resource'),async (req, res,next) => {
  // Code ES6
  try {   
    let body = req.body; 
    const result = await cloudinary.uploader.upload(req.file.path,{resource_type: 'video', folder:'programmerTutorial/'});
    body.resource = result.secure_url;
    const tutorial = await Tutorial.create(body); 
    res.status(200).json(tutorial);

  }catch(err){   
    res.status(500).send({  
       message: `An ocurred error ${err}`   
    })   
    next(err);  
  }           
});

/* Update product Resource */

app.put('/tutorial/resource/:id', storage.single('resource'),async (req, res,next) => {
  try {
    let video = await Tutorial.findById(req.params.id);
    const result = await cloudinary.uploader.upload(req.file.path,{resource_type: 'video',folder:'programmerTutorial/'});
    const data = {
      resource: result.secure_url || video.resource,

    };
    video = await Tutorial.findByIdAndUpdate(req.params.id, data, {new: true });
    res.json(video);

  }catch(err){   
    res.status(500).send({  
       message: `An ocurred error ${err}`   
    })   
    next(err);  
  }           
});
/* Update product tutorial */

export default app