import mongoose, {Schema, model} from 'mongoose';

const ItemSchema = new Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Please add a title value']
    },
    text: {
        type: String,
        required: [true, 'Please add a text value']
    }
}, {
    timestamps: true
});

export default model('Item', ItemSchema);