const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser')

const database = require('./config/database')
const userRoutes = require('./API/routes/users');
const Users = require('./models/Users')



//testing the database connection
database.authenticate()
.then(() => console.log('Database connected..'))
.catch(err => console.log(`error : ${err}`))

// to show logs of activity
app.use(morgan('dev'));

//body-parsing request 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

// app.use((req,res,next) => {
//     res.header('Access-Control-Allow-Origin','*')
//     res.header('Access-Control-Allow-Headers', '*')

//     if(req.method === 'OPTIONS'){
//         req.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET')
//         return res.status(200).json({})
//     }
//     next()
// })

// routing


// login
app.post('/logIn', (req,res,next) => {

    let {userName,password} = req.body ;

    Users.findOne({
        where:{
            userName : userName,
            password : password
        }
    })
    .then(user => {
        if(!user){
            res.json({message : 'you havnt registered yet ... Sign Up first.'})
        }
        else{

            res.json({message : 'You are registred user.. Wellcome!!', Details : user})

        }
    })
    .catch(err => {console.log(`${err}`)})

})

//signUp
app.post('/signUp',(req,res,next) => {

    let {userName,password,firstName,lastName,number,email} = req.body ;
    console.log(req.body)
    Users.findOne({
        where:{
            userName,
            password
        }
    })
    .then(user => {
        if(!user){
            Users.create({
                userName,
                password,
                firstName,
                lastName,
                number,
                email,
                friends : []
            })
            .then(user => {res.json({messsage: 'User created successfully .. ', user : user})})
            .catch(err => {`Error : ${err}`})
        }
        else{
            res.json({message : 'You are a registred user.. do Log In'})
            

        }
    }) 

})

// routing to users and friends
app.use('/users',userRoutes);

module.exports = app;