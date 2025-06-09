const express = require("express");
const app = express();
const vendorRoute = express.Router();
const bodyparser = require("body-parser");
const Vendor = require("./vendor.model");
var fs = require("fs");
const multer = require("multer");

//vendor registration code
vendorRoute.route("/register").post((req, res) => {
  var vendor = new Vendor(req.body);
  vendor
    .save()
    .then((vendor) => {
      if (vendor !== null) {
        res.send("Registration Successfull");
      } else {
        res.send("Registration failed");
      }
    })
    .catch((err) => {
      res.status(400).send("Registration failed");
    });
});

//login
vendorRoute.route("/login").post((req, res) => {
  var id = req.body.vuid;
  var pass = req.body.vupass;
  console.log("userid=" + id + "password=" + pass);
  Vendor.findOne({ $and: [{ VUserId: id }, { VUserPass: pass }] })
    .then((vendor) => {
      console.log(vendor);
      res.send(vendor);
    })
    .catch((err) => {
      res.send("Something went wrong");
    });
});

//get image
vendorRoute.route("/getimage/:vpicname").get((req, res) => {
  res.sendFile(
    "C:/Users/LENOVO PC/Desktop/MernStack/Project/Backend/server-app/vendor/vendorimage/" +
      req.params.vpicname
  );
});

//image save
const st = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      "C:/Users/LENOVO PC/Desktop/MernStack/Project/Backend/server-app/vendor/vendorimage/"
    );
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: st });
vendorRoute.post("/savevendorimage", upload.single("file"), (req, res) => {
  res.send("File Uploaded Successfully");
});

//get vendor for count
vendorRoute.route("/getvendorcount").get((req, res) => {
  Vendor.find()
    .then((vendor) => {
      res.send(vendor);
    })
    .catch((err) => {
      res.send("Something went wrong");
      res.end();
    });
});

//enable disable vendor by admin
vendorRoute.route("/vendormanage/:vid/:status").put((req, res) => {
  Vendor.updateOne({ Vid: req.params.vid }, { Status: req.params.status })
    .then((vendor) => {
      res.send("Vendor status updated successfully");
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = vendorRoute;