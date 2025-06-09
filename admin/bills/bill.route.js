const express=require('express')
const billRoute=express.Router()
let Bill=require('./bill.model')

//save bill
billRoute.route('/billsave').post((req,res)=>{
    // console.log("request for bill save")
    let bill=new Bill(req.body)
    bill.save().then(bill=>{
        res.send({'bill':'bill added successfully'})
    }).catch(err=>{
        console.log("bill save error ->"+err)
        res.send(err)
    })
})

//update bill status when payment is successfull
billRoute.route("/billstatusupdate/:billid").put((req,res)=>{
    Bill.updateMany({"billid":req.params.billid},{'status':'Success'}).then(res=>{
        res.send("Bill Status Updated to 'Success'")
    }).catch(err=>{
        res.send(err)
    })
})

//show all bills by customer id
billRoute.route('/billshow/:cid').get((req,res)=>{
    Bill.find({"cid":req.params.cid}).then(bill=>{
        res.send(bill)
        res.end()
    }).catch(err=>{
        res.send(err)
        res.end()
    })
})

//get bill id using cid
billRoute.route("/billshowbillids/:cid").get((req,res)=>{
    Bill.distinct("billid",{"cid":req.params.cid}).then(bill=>{
        res.send(bill)
        res.end()
    }).catch(err=>{
        res.send(err)
        res.end()
    })
})

//get id of last entered bill to generate id for next bill
billRoute.route('/getbillid').get((req,res)=>{
    Bill.find().sort({"billid":-1}).limit(1).then(bill=>{
        console.log("bill id array is ="+bill)
        res.send(bill)
        res.end()
    }).catch(err=>{
        res.send(err)
        res.end()
    })
})

//get bill details by bill id
billRoute.route('/showbillbyid/:billid').get((req,res)=>{
    Bill.find({"billid":req.params.billid}).then(bill=>{
        res.send(bill)
    }).catch(err=>{
        res.send(err)
    })
})

//show all bill
billRoute.route('/billshow').get((req,res)=>{
    Bill.find().then(bill=>{
        res.send(bill)
    }).catch(err=>{
        res.send(err)
    })
})

module.exports=billRoute;