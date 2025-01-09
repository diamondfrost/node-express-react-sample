const mongoose = require('mongoose');
// destructured const Schema = mongoose.Schema;
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String
});

// create a new collection called 'users' with schema userSchema
mongoose.model('users', userSchema);