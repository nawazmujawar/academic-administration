const path = require('path');
const fs = require('fs');
const transporter = require('../configs/nodemailer');

//Models
const Post = require('../models/post');

//Helpers
const generateThumbnail = require('../helpers/thumbnailGenerator');
const getPostData = require('../helpers/getPosts');
const getAllStudents = require('../helpers/getAllStudents');


//Common functions
function createPostModel(title, description, image, thumbnails, files, type, postedBy, department, year) {
    return post = new Post({
        title: title,
        description: description,
        image: image,
        thumbnails: thumbnails,
        files: files,
        type: type,
        postedBy: postedBy,
        department: department,
        year: year
    });
}

function createMailBody(to, subject, body) {
    return data = {
        from: 'academicappnotification@gmail.com',
        to: to,
        subject: subject,
        text: body
    };
}

exports.dashboard = async (req, res, next) => {
    try {
        await Post.find({ postedBy: req.session.userId }, (err, posts) => {
            if (err) {
                console.log(err);
            } else {
                return res.status(200).render('dashboard', { posts: posts.reverse() });
            }
        }).populate('postedBy');
    } catch (error) {
        console.error(error);
    }
}

exports.viewSinglePost = async (req, res, next) => {
    try {
        const post = await getPostData.getPost(req.params.postId);
        return res.status(200).render('viewPost', { post: post });
    } catch (error) {
        console.error(error);
    }
}

exports.removeSinglePost = async (req, res, next) => {
    try {
        Post.findByIdAndDelete(req.params.postId, (err, post) => {
            if (err) {
                console.log(err);
            }
            if (post.image.length > 0) {
                for (let index = 0; index < post.image.length; index++) {
                    fs.unlink(post.image[index], (err) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log('files removed');
                    });
                }

                for (let index = 0; index < post.thumbnails.length; index++) {
                    fs.unlink(post.thumbnails[index], (err) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log('files removed');
                    });
                }

            }
            if (post.files.length > 0) {
                for (let index = 0; index < post.files.length; index++) {
                    fs.unlink(post.files[index], (err) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log('files removed');
                    });
                }
            }
            return res.status(200).render('deleteMessage');
        })
    } catch (error) {
        console.err(error);
    }
}

exports.getSinglePost = (req, res, next) => {
    try {
        return res.status(200).render('newPost');
    } catch (error) {
        console.error(error);
    }
}

exports.postSinglePost = async (req, res, next) => {

    try {
        const { title, description, type, year } = req.body;
        const images = [];
        const thumbnails = [];
        const files = [];
        const emails = [];
        const urlHeroku = 'https://tkietbackend.herokuapp.com';
        const urlLocalHost = 'http://localhost:3000';

        const studentMails = await getAllStudents.getAllStudents(req.session.department, year);
        studentMails.map(student => {
            emails.push(student.email);
        });
        console.log(emails);

        //No files
        if (req.files.post == undefined && req.files.attachment == undefined) {
            var post = createPostModel(title, description, images, thumbnails, files, type, req.session.userId, req.session.department, year);
            await post.save((err, post) => {
                if (err) {
                    return res.status(201).json(err);
                } else {
                    const data = createMailBody(emails, `${req.session.name} has sent ${post.type} for ${req.session.department} Department + (${post.year} Year)`,
                        `Title: ${post.title}\n\n Description: ${post.description}\n\n To see post click here: ${urlHeroku}/student/feed/post/${post._id}`);
                    transporter.sendMail(data).then(status => console.log(status)).catch(error => console.error(error));
                    return res.status(201).redirect('/teacher/dashboard');
                }
            });
        }

         console.log(req.files);
        if (req.files.post == undefined && req.files.attachment != undefined) {
            //Add files
            files.push(req.files.attachment[0].path);
            var post = createPostModel(title, description, images, thumbnails, files, type, req.session.userId, req.session.department, year);
            await post.save((err, post) => {
                if (err) {
                    return res.status(201).json(err);
                } else {
                    const data = createMailBody(emails, `${req.session.name} has sent ${post.type} for ${req.session.department} Department + (${post.year} Year)`,
                        `Title: ${post.title}\n\n Description: ${post.description}\n\n To see post click here: ${urlHeroku}/student/feed/post/${post._id}`);
                    transporter.sendMail(data).then(status => console.log(status)).catch(error => console.error(error));
                    return res.status(201).redirect('/teacher/dashboard');
                }
            });
        }

        //When more than 1 images and 1 files
        console.log("req => " + req);
        if (req.files.post.length > 1 && req.files.attachment != undefined) {
            //Add images
            for (let index = 0; index < req.files.post.length; index++) {
                images.push(req.files.post[index].path);
                //Generate thumbnails for images
                let fileName = 'uploads/' + 'thumbnail-' + Date.now() + path.extname(req.files.post[index].originalname);
                generateThumbnail(req.files.post[index].path, 400, 200, fileName);
                thumbnails.push(fileName);
            }
            //Add files
            for (let index = 0; index < req.files.attachment.length; index++) {
                files.push(req.files.attachment[index].path);
            }
            var post = createPostModel(title, description, images, thumbnails, files, type, req.session.userId, req.session.department, year);
            await post.save((err, post) => {
                if (err) {
                    return res.status(201).json(err);
                } else {
                    const data = createMailBody(emails, `${req.session.name} has sent ${post.type} for ${req.session.department} Department + (${post.year} Year)`,
                        `Title: ${post.title}\n\n Description: ${post.description}\n\n To see post click here: ${urlHeroku}/student/feed/post/${post._id}`);
                    transporter.sendMail(data).then(status => console.log(status)).catch(error => console.error(error));
                    return res.status(201).redirect('/teacher/dashboard');
                }
            });
        }


        if (req.files.post.length == 1 && req.files.attachment != undefined) {
            images.push(req.files.post[0].path);
            let fileName = 'uploads/' + 'thumbnail-' + Date.now() + path.extname(req.files.post[0].originalname);
            //Generate thumbnails for images
            generateThumbnail(req.files.post[0].path, 400, 200, fileName);
            thumbnails.push(fileName);
            //Add files
            files.push(req.files.attachment[0].path);
            var post = createPostModel(title, description, images, thumbnails, files, type, req.session.userId, req.session.department, year);
            await post.save((err, post) => {
                if (err) {
                    return res.status(201).json(err);
                } else {
                    const data = createMailBody(emails, `${req.session.name} has sent ${post.type} for ${req.session.department} Department + (${post.year} Year)`,
                        `Title: ${post.title}\n\n Description: ${post.description}\n\n To see post click here: ${urlHeroku}/student/feed/post/${post._id}`);
                    transporter.sendMail(data).then(status => console.log(status)).catch(error => console.error(error));
                    return res.status(201).redirect('/teacher/dashboard');
                }
            });
        }
       


        if (req.files.post.length == 1 && req.files.attachment == undefined) {
            images.push(req.files.post[0].path);
            let fileName = 'uploads/' + 'thumbnail-' + Date.now() + path.extname(req.files.post[0].originalname);
            //Generate thumbnails for images
            generateThumbnail(req.files.post[0].path, 400, 200, fileName);
            thumbnails.push(fileName);

            var post = createPostModel(title, description, images, thumbnails, files, type, req.session.userId, req.session.department, year);
            await post.save((err, post) => {
                if (err) {
                    return res.status(201).json(err);
                } else {
                    const data = createMailBody(emails, `${req.session.name} has sent ${post.type} for ${req.session.department} Department + (${post.year} Year)`,
                        `Title: ${post.title}\n\n Description: ${post.description}\n\n To see post click here: ${urlHeroku}/student/feed/post/${post._id}`);
                    transporter.sendMail(data).then(status => console.log(status)).catch(error => console.error(error));
                    return res.status(201).redirect('/teacher/dashboard');
                }
            });
        }

        if (req.files.post.length > 1 && req.files.attachment == undefined) {
            for (let index = 0; index < req.files.post.length; index++) {
                images.push(req.files.post[index].path);
                //Generate thumbnails for images
                let fileName = 'uploads/' + 'thumbnail-' + Date.now() + path.extname(req.files.post[index].originalname);
                generateThumbnail(req.files.post[index].path, 400, 200, fileName);
                thumbnails.push(fileName);
            }

            var post = createPostModel(title, description, images, thumbnails, files, type, req.session.userId, req.session.department, year);
            await post.save((err, post) => {
                if (err) {
                    return res.status(201).json(err);
                } else {
                    const data = createMailBody(emails, `${req.session.name} has sent ${post.type} for ${req.session.department} Department + (${post.year} Year)`,
                        `Title: ${post.title}\n\n Description: ${post.description}\n\n To see post click here: ${urlHeroku}/student/feed/post/${post._id}`);
                    transporter.sendMail(data).then(status => console.log(status)).catch(error => console.error(error));
                    return res.status(201).redirect('/teacher/dashboard');
                }
            });
        }




    } catch (error) {
        console.error(error);
    }
}

exports.getSignOut = (req, res, next) => {
    try {
        req.session.destroy((err) => {
            if (!err) {
                return res.status(200).redirect('/signin/teacher');
            } else {
                return res.status(404).json(err);
            }
        })
    } catch (error) {
        console.error(error);

    }
}