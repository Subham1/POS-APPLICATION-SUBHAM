const mongoose = require('mongoose')
const URL = 'mongodb+srv://subham1234:subham1234@cluster0.jehyw.mongodb.net/pos-app'
mongoose.connect(URL)
    .then((res)=>{
        console.log("connected to db")
    })
    .catch((err)=>{
        console.log("error connected to db " + err)
    })

