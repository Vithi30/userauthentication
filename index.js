const express =require('express');
const dotenv=require('dotenv').config()
const cors =require('cors')
const {mongoose} = require('mongoose')
const app =express();
const {UserRouter} =require('./routes/authRoutes')


//database
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database connected'))
.catch((err)=> console.log('Database  not connected' ,err))

app.use(express.json())
app.use(cors({
    origin:true,
    credentials:true
}))

app.get('/',function(req,res){
    return res.send('test')
})

app.use('/',require('./routes/authRoutes'))

const port= 8000;
app.listen(port,() => console.log('Server is running on port  '))