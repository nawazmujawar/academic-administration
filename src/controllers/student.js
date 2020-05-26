//Models
const Post = require('../models/post');

//Helpers
const getPostData = require('../helpers/getPosts');

exports.getFeed = async (req, res, next) => {
    try {
        await Post.find({ $and: [{ department: req.session.department }, { year: req.session.year }] }).populate('postedBy').then(posts => {
            if (posts) {
                return res.status(200).render('feed', { posts: posts.reverse(), fullName: req.session.fullName });
            }
        });
    } catch (error) {
        console.error(error);
    }
}

exports.getSinglePost = async (req, res, next) => {
    try {
        const post = await getPostData.getPost(req.params.postId);
        return res.status(200).render('viewPostStudent', { post: post });
    } catch (error) {
        console.error(error);
    }
}

exports.getSignOut =  (req, res, next) => {
    try {
        req.session.destroy((err) => {
            if (!err) {
                return res.status(200).redirect('/signin/student');
            } else {
                return res.status(404).json(err);
            }
        })
    } catch (error) {
        console.error(error);

    }
}