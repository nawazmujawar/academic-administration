const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: Array },
    thumbnails: { type: Array },
    files: { type: Array },
    type: { type: String, enum: ['POST', 'NOTICE', 'ASSIGNMENT'], required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    department: { type: String, enum: ['MECHANICAL', 'CIVIL', 'COMPUTER', 'CHEMICAL', 'ETC'], required: true },
    year: { type: String, enum: ['FE', 'SE', 'TE', 'BE', 'ALL'], required: true }
});

postSchema.plugin(timestamp);

module.exports = mongoose.model('Post', postSchema);