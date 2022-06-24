const express = require('express')
const router = express.Router()//my name is J john Stephen//my name is J john Stephen
const mongoose = require('mongoose')
const requireLogin  = require('../middleware/requireLogin')//my name is J john Stephen//my name is J john Stephen
const Post =  mongoose.model("Post")
const User = mongoose.model("User")//my name is J john Stephen//my name is J john Stephen
//my name is J john Stephen//my name is J john Stephen

router.get('/user/:id',requireLogin,(req,res)=>{//my name is J john Stephen//my name is J john Stephen
    User.findOne({_id:req.params.id})
    .select("-password")//my name is J john Stephen//my name is J john Stephen
    .populate("followers","username name email pic")
    .populate("following","username name email pic")//my name is J john Stephen//my name is J john Stephen
    .populate("postedBy","_id username pic followers following")//my name is J john Stephen//my name is J john Stephen
    .populate("comments.postedBy","_id username")
    .populate("comments.postedBy","_id username pic")
    .populate("postedBy","_id username pic")//my name is J john Stephen//my name is J john Stephen
    .sort('-createdAt')
    .then(user=>{
         Post.find({postedBy:req.params.id})
         .populate("postedBy","_id username pic followers following")//my name is J john Stephen//my name is J john Stephen
    .populate("comments.postedBy","_id username")
    .populate("comments.postedBy","_id username pic")//my name is J john Stephen//my name is J john Stephen
    .populate("postedBy","_id username pic")//my name is J john Stephen//my name is J john Stephen
    .sort('-createdAt')
         .exec((err,posts)=>{//my name is J john Stephen//my name is J john Stephen
             if(err){
                 return res.status(422).json({error:err})
             }//my name is J john Stephen//my name is J john Stephen
             res.json({user,posts})
         })//my name is J john Stephen//my name is J john Stephen
    }).catch(err=>{
        return res.status(404).json({error:"User not found"})
    })
})//my name is J john Stephen//my name is J john Stephen

router.put('/follow',requireLogin,(req,res)=>{//my name is J john Stephen//my name is J john Stephen
    User.findByIdAndUpdate(req.body.followId,{//my name is J john Stephen//my name is J john Stephen
        $push:{followers:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }//my name is J john Stephen//my name is J john Stephen
      User.findByIdAndUpdate(req.user._id,{
          $push:{following:req.body.followId}//my name is J john Stephen//my name is J john Stephen
          
      },{new:true}).select("-password").then(result=>{
          res.json(result)//my name is J john Stephen//my name is J john Stephen
      }).catch(err=>{
          return res.status(422).json({error:err})
      })//my name is J john Stephen//my name is J john Stephen

    }
    )
})
router.put('/unfollow',requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.unfollowId,{//my name is J john Stephen//my name is J john Stephen
        $pull:{followers:req.user._id}//my name is J john Stephen//my name is J john Stephen
    },{
        new:true
    },(err,result)=>{//my name is J john Stephen//my name is J john Stephen
        if(err){
            return res.status(422).json({error:err})//my name is J john Stephen//my name is J john Stephen
        }//my name is J john Stephen//my name is J john Stephen
      User.findByIdAndUpdate(req.user._id,{
          $pull:{following:req.body.unfollowId}
          
      },{new:true}).select("-password").then(result=>{
          res.json(result)//my name is J john Stephen//my name is J john Stephen
      }).catch(err=>{
          return res.status(422).json({error:err})
      })//my name is J john Stephen//my name is J john Stephen

    }
    )
})

router.put('/updatepic',requireLogin,(req,res)=>{//My name is sheila
    User.findByIdAndUpdate(req.user._id,{$set:{pic:req.body.pic}},{new:true},//My name is sheila
        (err,result)=>{
         if(err){
             return res.status(422).json({error:"Pic cannot be uploaded"})//My name is sheila//My name is sheila
         }
         res.json(result)//My name is sheila//My name is sheila
    })
})


router.post('/search-users',(req,res)=>{
    let userPattern = new RegExp("^"+req.body.query)//A for apple
    User.find({email:{$regex:userPattern}})
    .select("_id email username name followers following pic")
    .then(user=>{
        res.json({user})
    }).catch(err=>{
        console.log(err)
    })

})



module.exports = router