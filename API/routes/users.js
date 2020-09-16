const express = require('express');
const router = express.Router();
const database = require('../../config/database');
const Users = require('../../models/Users')
const friendRoutes = require('./friends');



// to get all users list
router.get('/',(req,res,next) => 
    
    Users.findAll()
    .then(users => {
        res.json({message:'All users are here... ','users' : users})
    })
    .catch(err => console.log(`Error : ${err}`))
)

// get information of partucular user
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
            res.json({'user' : user})

        }
    })
    
})

// update user information
router.put('/:user_id',(req,res,next) => {

    const data={
        userName : req.body.userName,
        password : req.body.password,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        number : req.body.number,
        email : req.body.email
    }
    const id = req.params.user_id;
    let {userName,password,firstName,lastName,number,email}=data;

    Users.update({userName,password,firstName,lastName,number,email},{
        where : {
            id : id
        }
    })
    .then((user) => {res.json({message:'Successfully updated..'})})

})

// delete user
router.delete('/:user_id',(req,res,next) => {

    const id = req.params.user_id ; 

    Users.destroy({
        where : {
            id
        }
    })
    .then(
        res.json({message: `${id} deleted from record..`})
    )
    .catch(err => {console.log(`Error : ${err}`)})
})

// to access friends of user
router.use('/friends',friendRoutes);


module.exports = router;