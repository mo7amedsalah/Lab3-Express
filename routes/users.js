var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
var User = require('../model/User');
var Post = require('../model/Post');
/* POST  login */
router.post('/login', async(req, res) => {
    try {
    
        let user = await User.findOne({email: req.body.email});
        // user not found
         if(!user){
             throw 'Auth failed';
         }
         // check password is correct
         let isEqual= await bcrypt.compare(req.body.password, user.password);
         if(isEqual){
             console.log(user.email);
             let token = await jwt.sign({id:user._id,email:user.email}, 'secret',{expiresIn: '1h'});
             res.status(200).json({
                 message:'Auth successful',
                 token:token,
                 user: user
             });
         }else {
             throw 'Auth failed';
         }
    } catch (err) {
        res.status(401).json({
            message: 'error',
            err: err
        });
    }
 
 
    

});

/* GET users listing. */
router.get('/', auth, async(req, res) => {
    try {
        let users=await User.find({});
        res.json({
            message: "users list",
            data : users
        });
    } catch (err) {
        res.json({
            message: 'error',
            err: err
        });
    }
});

/* GET user details. */
router.get('/:id', auth, async(req, res) => {
    try {
        let user=await User.findOne({_id: req.params.id});
        res.json({
            message: "user details",
            data : user
        });
    } catch (err) {
        res.json({
            message: 'error',
            err: err
        });
    }
});

/* POST add new user */
router.post('/', async(req, res)=>{
    try {
        let user=await User.create(req.body);
        res.json({
            message: "user add successfully",
            data : user
        });
    } catch (err) {
        res.json({
            message: 'error',
            err: err
        });
    }
});

/* PUT update user */
router.put('/:id', auth, async(req, res)=>{
    try {
        let user=await User.findByIdAndUpdate(req.params.id,{$set: req.body }, { new: true });
        res.json({
            message: "user updated successfully",
            data : user
        });
    } catch (err) {
        res.json({
            message: 'error',
            err: err
        });
    }
});

/* DELETE  delete user */
router.delete('/:id', auth, async(req, res)=>{
    try {
        let user=await User.findByIdAndRemove(req.params.id);
        res.json({
            message: "user removed successfully",
            data : user
        });
    } catch (err) {
        res.json({
            message: 'error',
            err: err
        });
    }
});

/* GET posts listing. */
router.get('/:id/posts', async(req, res) => {
    try {
        let posts= await Post.find({author: req.params.id}).populate('author');
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

module.exports = router;