const express = require('express');
const router = express.Router();
const database = require('../../config/database');
const Users = require('../../models/Users')


// show friend list of id
router.get('/:user_id',(req,res,next) => {
    
    const id=req.params.user_id;

    Users.findOne({
        where:{
            id : id
        }
    })
    .then(user => {
        if(!user){
            res.sendStatus('404')
        }
        else{
            res.json({message:`You have ${user.friends.length} friends`,friendList : user.friends})

        }
    })

})

// add and remove id1 as 
router.put('/:user_id/:user_id1',(req,res,next) => {
    
    const id=req.params.user_id ; 
    const id1=parseInt(req.params.user_id1) ; 
    let frnd = [] 
    let msg = ''
   
    Users.findOne({
        where:{
            id : id
        }
    })
    .then(user => {
       frnd = user.friends
            
       if(frnd.includes(id1)){
            msg='removed'
            frnd.forEach((i,index) => {
                    if(i===id1){
                        frnd.splice(index,1)
                    }
            })
        }
        else{
            msg='added'
            frnd.push(id1)
            }

            Users.update({
                friends:frnd},
                {
                    where : {
                        id
                    }})
                    .then(() => {res.json({message : `${id1} ${msg} as friend.`})})   
    })

    

})


module.exports = router