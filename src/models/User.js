const mongoose = require('mongoose');

const User = mongoose.model('User',{
    name: String,
    lastName: String,
    email: String,
    password: String,    
})

/*
const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true,
    },

    lastName: {
        type: String,
        require: true,
    },

    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
        select: false,
    },

    createdAt: {
        type: Date,
        default: Date.now,
   },

   updatedAt:  {
        type: Date,
        default: Date.now,
   },
});

UserSchema.pre('save', async function(next) {
   const hash = await bcrypt.hash(this.password, 10);
this.password = hash;
});

const User = mongoose.model('User', UserSchema); */

module.exports = User