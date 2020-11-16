require('./config/config');
// require('dotenv').config()
import express from 'express';
const app = express();
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import router from './routes';
// const port = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
//application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(router);

const history=require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname,'public')));


//config db
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGO_URLDB,/* process.env.URLDB, */ { useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify:false }, (err, res) => {
    if (err) {
        console.log(`Error connecting to the database ${err}`)
    }
    else {
        console.log('Connection to the established database');
    }
    app.listen(process.env.PORT, () => {
        console.log(`Connection on port ${process.env.PORT}`)
    })
})
