// Process global object

// Port
process.env.PORT = process.env.PORT || 3000;

// Environment
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// BBDD
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/coffee';
} else {
    urlDB = 'mongodb+srv://hck3791:iQJGcAyIdhQOlX17@cluster-node-course.ioffc.mongodb.net/coffee';
}

process.env.URLDB = urlDB; // URLDB its a global var invented by us