const express = require('express');
const router = express.Router();
const Post = require('../model/Post');
const User = require('../model/user');

// All Posts
router.get('/', (req, res, next) => {
   Post.getAllPosts((err, posts) => {
       if(err) {
            res.json({success: false, message: 'Failed to load Posts'})
       }else {
           res.json({success: true, posts: posts.map(post => {
               if(post.author){
                   return {
                       id: post._id,
                       title: post.title,
                       body: post.body,
                       excerpt: post.excerpt,
                       createdAt: post.createdAt,
                       author: {
                           id: post.author._id,
                           name: post.author.name,
                           email: post.author.email,
                           username: post.author.username
                       }
                   }
               }
           })});
       }
   });
});

// Add Post
router.post('/', (req, res, next) => {
    let newPost;
    let id = req.body.author
    User.getUserById(id, (err, user) => {
        if(!user) {
            res.json({success: false, message: 'User not found'});
            res.end();
        }
        newPost = new Post({
            author: user._id,
            title: req.body.title,
            body: req.body.body,
            excerpt: req.body.excerpt
        });
        Post.addPost(newPost, (err, post) => {
            if(err) {
                res.json({success: false, message: 'Failed to add post'});
            }else {
                res.json({success: true, message: 'Post added successfully', 
                    post: post
                });
            }
    
        });
    });
   
});

// Update Post
router.put('/:id', (req, res, next) => {
    let id = req.params.id;

    let postUpdate = {
        title: req.body.title,
        body: req.body.body,
        excerpt: req.body.excerpt,
        author: req.body.author
    };

    Post.getPostById(id , (err, post) => {
        if(!post) {
            res.json({success: false, message: 'Post not found'});
            res.end();
        }else {
            Post.updatePostById(id, {$set: postUpdate}, {new: true}, (err, post) => {
                if(err) {
                    res.json({success: false, message: 'Error: Unable to update post'});
                }else {
                    res.json({
                        success: true,
                        message: 'Post was updated successfully',
                        post: {
                                id: post._id,
                               title: post.title,
                               body: post.body,
                               excerpt: post.excerpt,
                               author: post.author,
                            }
                    });
                 }
            });
        }
    });

    
}); 

router.delete('/:id', (req, res, next) => {
    let id = req.params.id;

    Post.getPostById(id, (err, post) => {
        if(!post) {
            res.json({success: false, message: 'Post not found'});
            res.end();
        }else {
            Post.deletePostById(id, (err, post) => {
                if(err) {
                    res.json({success: false, message: 'Error: Unable to delete post'});
                }else {
                    res.json({success: true, message: 'Post was deleted successfully'});
                }
            });
        }
    });
    
});

module.exports = router;