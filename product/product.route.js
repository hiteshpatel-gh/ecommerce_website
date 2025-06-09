const express=require('express')
const productRoute=express.Router()
let Product=require("./product.model")
const multer=require('multer')

//save Product
productRoute.route('/saveproduct').post((req,res)=>{
    let product=new Product(req.body)
    product.save().then(product=>{
        res.send("Product added successfully")
    }).catch(err=>{
        res.send(err)
    })
})

//get product all 
productRoute.route('/showproduct').get((req,res)=>{
    Product.find().then(product=>{
        res.send(product)
    }).catch(err=>{
        res.status(400).send("Data not found something went wrong")
    })
})

//get product status by pid
productRoute.route('/showproductstatus/:pid').get(function(req,res){
    Product.findOne({"pid":req.params.pid}).then(product=>{
        console.log(product)
        res.send(product)
    }).catch(err=>{
        res.status(400).send("Data not found something went wrong")
    })
})

//get product count for id
productRoute.route('/getmaxpid').get(function (req,res){
    Product.find().then(product=>{
        console.log(product)
        res.send(product)
    }).catch(err=>{
        res.status(400).send("Data not found something went wrong")
    })
})

//save product image
const stv=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"C:/VS Code/Web Dev/Coaching UI (Web Dev)/Project/BackEnd/server/product/productimages/")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const upload=multer({storage:stv})
productRoute.post('/saveproductimage',upload.single('file'),(req,res)=>{
    res.send("Uploaded successfully")
})

// get product image
productRoute.route('/getproductimage/:picname').get((req,res)=>{
    res.sendFile("C:/VS Code/Web Dev/Coaching UI (Web Dev)/Project/BackEnd/server/product/productimages/"+req.params.picname)
})

//get product by vendor id
productRoute.route('/showproductbyvendor/:vid').get((req,res)=>{
    Product.find({"vid":req.params.vid}).then(product=>{
        console.log(product)
        res.send(product)
    }).catch(err=>{
        res.status(400).send("Data not found something went wrong")
    })
})

//get product by product category id
productRoute.route("/showproductbycatgid/:pcatgid").get(function (req,res){
    Product.find({"pcatgid":req.params.pcatgid}).then(product=>{
        console.log(product)
        res.send(product)
    }).catch(err=>{
        res.send(err)
    })
})

//update status
productRoute.route('/updateproductstatus/:pid/:status').put((req,res)=>{
    Product.updateOne({"pid":req.params.pid},{"status":req.params.status}).then(res=>{
        res.send("Product status updated successfully")
    }).catch(err=>{
        res.send()
    })
})

module.exports=productRoute;