const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
require('../routes/user').delete;

let roles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} is not a role'
}

const Schema = mongoose.Schema;

let clientSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        require: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true]
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: roles
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: true
    }
});

// The password will not be visible on a json
clientSchema.methods.toJSON = function() {
    let client = this;
    let clientObject = client.toObject();
    delete clientObject.password;
    return clientObject;
}

clientSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('client', clientSchema);