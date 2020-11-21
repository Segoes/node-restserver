// Process global object

// Port
process.env.PORT = process.env.PORT || 3000;

// Environment
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Token expire
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// Token seed
process.env.SEED = process.env.SEED || 'este-es-el-seed-de-desarrollo';

// BBDD
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/coffee';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB; // URLDB its a global var invented by us