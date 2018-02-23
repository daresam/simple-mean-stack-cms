const mongoose = require('mongoose');
const config = require('../config/database');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    excerpt: {
        type: String,
        required: true
    }

},
{timestamps: true}

);

const Post = module.exports = mongoose.model('Post', PostSchema);


module.exports.getAllPosts = (callback) => {
    Post.find(callback).populate('author');
} 

module.exports.addPost = (newPost, callback) => {
    newPost.save(callback);
}

module.exports.getPostById = (id, callback) => {
    let query = {_id: id};
    Post.findOne(query, callback);
}

module.exports.updatePostById = (id, post, options, callback) => {
    let query = {_id: id};
    Post.findByIdAndUpdate(query, post, options, callback);
}

module.exports.deletePostById = (id, callback) => {
    let query = {_id: id};
    Post.remove(query, callback);
}