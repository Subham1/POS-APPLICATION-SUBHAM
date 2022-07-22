const express = require('express')
const dbConnect = require('./dbConnect')
const itemsRoute = require('./routes/itemsRoute')
const usersRoute = require('./routes/usersRoute')
const billsRoute = require('./routes/billsRoute')
const app = express()
// express.json() helps us to read the incoming json data 
app.use(express.json())
app.use('/api/items/',itemsRoute)
app.use('/api/users/', usersRoute)
app.use('/api/bills/',billsRoute)

const path = require('path')
if(process.send.NODE_ENV === 'production'){
    app.use('/',express.static('client/build'))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client/build/index.html'))
    })
}

const port  = process.env.PORT || 4000
app.get('/',(req,res)=>{
    res.send("Hello world")
})
app.listen(port,()=>{
    console.log("Server is running on port " + port)
})