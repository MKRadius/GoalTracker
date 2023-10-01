import mongoose from 'mongoose';

const goalSchema = mongoose.Schema({
    text: { type: String, required: true },
    user: { type: Object, required: true }
}, {
    collection: 'goals'
});

const Goal = mongoose.model("Goal", goalSchema);

export { Goal };
