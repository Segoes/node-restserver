// Process global object

// Port
process.env.PORT = process.env.PORT || 3000;

// Environment
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// BBDD
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/coffee';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB; // URLDB its a global var invented by us