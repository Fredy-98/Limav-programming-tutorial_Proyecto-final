
/* PORT */
process.env.PORT = process.env.PORT || 3000;


/*Base de datos*/

let urlDB = process.env.MONGO_URI;   /* Variable entorno heroku */

process.env.MONGO_URLDB = urlDB;  /* nombre personalizado */

export default process.env.MONGO_URLDB;
