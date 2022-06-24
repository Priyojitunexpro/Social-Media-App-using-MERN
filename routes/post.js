const express = require('express')//my name is J john Stephen//my name is J john Stephen
const router = express.Router()//my name is J john Stephen//my name is J john Stephen
const mongoose = require('mongoose')
const requireLogin  = require('../middleware/requireLogin')
const Post =  mongoose.model("Post")
//my name is J john Stephen//my name is J john Stephen
router.get('/allpost',requireLogin,(req,res)=>{
    Post.find()
    .populate("postedBy","_id username pic followers following")//my name is J john Stephen//my name is J john Stephen
    .populate("comments.postedBy","_id username")
    .sort('-createdAt')
    .then((posts)=>{
        res.json({posts})
    }).catch(err=>{
        console.log(err)
    })  
})//my name is J john Stephen//my name is J john Stephen

router.get('/getsubpost',requireLogin,(req,res)=>{

    // if postedBy in following
    Post.find({postedBy:{$in:req.user.following}})
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")//my name is J john Stephen//my name is J john Stephen
    .sort('-createdAt')//my name is J john Stephen//my name is J john Stephen
    .then(posts=>{
        res.json({posts})
    })//my name is J john Stephen//my name is J john Stephen
    .catch(err=>{
        console.log(err)//my name is J john Stephen//my name is J john Stephen//my name is J john Stephen
    })
})


router.post('/createpost',requireLogin,(req,res)=>{
    const {body,pic} = req.body //my name is J john Stephen//my name is J john Stephen
    if(!body && !pic){
        return  res.status(422).json({error:"Please add all the fields"})
    }
    if(!body || !pic){//my name is J john Stephen//my name is J john Stephen
        return  res.status(422).json({error:"Please add all the fields"})
      }
      req.user.password = undefined
      const post = new Post({//my name is J john Stephen//my name is J john Stephen//my name is J john Stephen
        body,
        photo:pic,
        postedBy:req.user//my name is J john Stephen//my name is J john Stephen
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/mypost',requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedBy","_id username name pic followers following")
    .populate("comments.postedBy","_id username name")
    .populate("comments.postedBy","_id username pic name")
    .populate("postedBy","_id username name pic")
    .sort('-createdAt')
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.put('/like',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    })
    .populate("comments.postedBy","_id username pic")
    .populate("postedBy","_id username pic")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

router.put('/unlike',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    })
    .populate("comments.postedBy","_id username pic")
    .populate("postedBy","_id username pic")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

router.put('/comment',requireLogin,(req,res)=>{
    const comment = {
        text:req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id username pic")
    .populate("postedBy","_id username pic")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

router.delete('/deletepost/:postId',requireLogin,(req,res)=>{
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id username pic")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
        if(post.postedBy._id.toString() === req.user._id.toString()){
              post.remove()
              .then(result=>{
                  res.json(result)
              }).catch(err=>{
                  console.log(err)
              })
        }
    })
})

router.delete("/deletecomment/:id/:comment_id", requireLogin, (req, res) => {
    const comment = { _id: req.params.comment_id };
    Post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { comments: comment },
      },
      {
        new: true, 
      }
    )
      .populate("comments.postedBy", "_id username pic")
      .populate("postedBy", "_id username pic")
      .exec((err, postComment) => {
        if (err || !postComment) {
          return res.status(422).json({ error: err });
        } else {
         
          const result = postComment;
          res.json(result);
        }
      });
  });

module.exports = router
