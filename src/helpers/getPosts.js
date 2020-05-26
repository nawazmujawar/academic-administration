const Post = require('../models/post');

const getAllPosts = () => {
    return Post.find().populate('postedBy');
}

const getPost = (id) => {
    return Post.findById(id).populate('postedBy');
}

exports.getAllPost = getAllPosts;
exports.getPost = getPost;
