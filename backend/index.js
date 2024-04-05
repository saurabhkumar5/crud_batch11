const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
     
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/crud11');
}

const userSchema  = new mongoose.Schema({
    name:String,
    email:String,
    password:Number
})

const userModel = mongoose.model("user",userSchema)


app.get('/',(req,res)=>{
     
       userModel.find({})
       .then((users)=>res.json(users))
       .catch((err)=>res.json(err))
})

app.post('/createUser',(req,res)=>{
              userModel.create(req.body)
             
    res.send("hello from backend")
})

app.delete('/deleteUser/:data',(req,res)=>{
      
       const id  = req.params.data
       userModel.findByIdAndDelete({_id:id})
       .then(users=>res.json(users))
       .catch(err=>res.json(err))
})

app.get('/getUser/:id',(req,res)=>{
       const id = req.params.id
       // console.log(id)

       userModel.findById({_id:id})
       .then(users=>res.json(users))
       .catch(err=>res.json(err))
})

app.put('/updateUser/:id',(req,res)=>{
       const id  = req.params.id
       console.log(req.body.name)
       userModel.findByIdAndUpdate({_id:id},{
              name:req.body.name,
              email:req.body.email,
              password:req.body.password
       })
       .then(value=>res.json(value))

})


app.listen(4000,()=>console.log("server is started"))