import {Schema, model} from 'mongoose';

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please add a email']
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
}, {
    timestamps: true
})

export default model('User', UserSchema);