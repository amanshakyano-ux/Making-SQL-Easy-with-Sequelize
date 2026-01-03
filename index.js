const express = require('express')
const app = express()

const routes = require('./routes/studentRouter')
const router = require('./routes/studentRouter')
 
app.use(express.json())

app.use("/students",router)
 

app.listen(3000,(err)=>{
    console.log("server is running")
})
