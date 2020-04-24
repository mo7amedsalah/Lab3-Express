
var express = require('express');
var router = express.Router();
var Post = require('../model/Post');

/* GET posts listing. */
router.get('/', async(req, res) => {
try {
    let posts= await Post.find({}).populate('author');
    res.json({
        message: "posts list",
        data : posts
    });
} catch (err) {
    res.json({
        message: 'error',
        err: err
    });
}
});

/* GET post details. */
router.get('/:id', async(req, res) => {
   try {
    let post= await Post.findOne({_id: req.params.id}).populate('author');
    res.json({
        message: "post details",
        data : post
    });
   } catch (err) {
    res.json({
        message: 'error',
        err: err
    });
   }
});

/* POST add new post */
router.post('/', async(req, res)=>{
   try {
    let post=await Post.create(req.body);
    res.json({
        message: "post add successfully",
        data : post
    });
   } catch (err) {
    res.json({
        message: 'error',
        err: err
    });
   }
});

/* PUT update post */
router.put('/:id',async (req, res)=>{
    try {
        let post=await Post.findByIdAndUpdate(req.params.id,{$set: req.body }, { new: true });
        res.json({
            message: "post updated successfully",
            data : post
        });
    } catch (err) {
        res.json({
            message: 'error',
            err: err
        });
    }
});

/* DELETE  delete post */
router.delete('/:id', async(req, res)=>{
    try {
        let post=await Post.findByIdAndRemove(req.params.id);
        res.json({
            message: "post removed successfully",
            data : post
        });
    } catch (err) {
        res.json({
            message: 'error',
            err: err
        });
    }
});



module.exports = router;