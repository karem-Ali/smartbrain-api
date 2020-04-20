const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const bcrypt=require('bcrypt-nodejs')
const cors=require('cors')
const signin=require('./controllers/signin')
const register=require('./controllers/register')
const image=require('./controllers/load')
const  db = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'kareem',
      database : 'smartbrain'
    }
  });
app.use(bodyParser.json())
app.use(cors())

const database={
    users:[
        {
                id:'123',
                name:'karem',
                email:'karem.phones2018@gmail.com',
                password:'karemali123',
                entries:0,
                joined: new Date()
        },
        {
            id:'1212',
            name:'ahmed',
            email:'ahmed.phones2018@gmail.com',
            password:'ahmed123',
            entries:0,
            joined: new Date()
        }
    ]
}
app.get('/',(req,res)=>{
    res.send(database.users)
})
app.get('/profile/:id',(req,res)=>{
    const {id}=req.params
    db.select('*').from('users').where({
        'id':id
    }).then(user=>{
        if(user.length >0){
        res.json(user)
        }else{
            res.status(400).json('user not found')
        }
    }).catch(err=> res.json('error getting user')) 
})
app.put('/image',(req,res)=>{image.updateentries(req,res,db)})
app.post('/signin',(req,res)=>{signin.handlesignin(req,res,db,bcrypt)})
app.post('/register',(req,res)=>{register.handleregister(req,res,db,bcrypt)})
app.listen(3001,()=>{
    console.log('app is running')
})