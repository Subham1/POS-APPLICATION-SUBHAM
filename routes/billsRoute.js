const express = require('express')
const BillModel = require('../models/billModel')
const router = express.Router()

router.post('/charge-bill', async (req,res)=>{
    try{
        const newbill = new BillModel(req.body);
        await newbill.save()
        res.send('Bill Chraged Successfully')
    }
    catch(err){
        res.status(400).json(err)
    }
})
router.get('/get-all-bills', async (req,res)=>{
    try{
        const bills = await BillModel.find()
        res.send(bills)
    }
    catch(err){
        res.status(400).json(err)
    }
})

module.exports = router