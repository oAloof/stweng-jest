const mongoose = require('./connection');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }
  }
);

const Post = mongoose.model('posts', postSchema);

exports.createPost = (obj, next) => {
    const post = new Post(obj);

    post.save(function(err, post) {
        next(err, post)
    }) 
}

exports.updatePost = (postId, obj, next) => {
    
    Post.findOneAndUpdate({ _id: postId }, obj, { new: true }, (err, updatedPost) =>{
        if (err) {
            return next(err);
        }
        next(null, updatedPost);
    })
}

exports.findPost = (postId, next) => {
    Post.find({_id: postId}, (err, foundPost) => {
        if (err) {
            return next(err);
        }
        next(null, foundPost);
    })
    
}

exports.getAllPosts = (obj, next) => {
    Post.find({}, (err, posts) => {
        if (err) {
            return next(err);
        }
        next(null, posts);
    })
}