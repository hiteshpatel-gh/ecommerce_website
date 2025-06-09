const express = require("express");
const customerRoute = express.Router();
const bodyParser = require("body-parser");
const Customer = require("./customer.model");
var fs = require("fs");
const multer = require("multer");
const nodemailer = require("nodemailer");

function sendGMail(mailto) {
  console.log("mail:-" + mailto);
  res.status(200).json({ response: "Mail Sent" });
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: "hiteshpatel4757@gmail.com",
      pass: "necc umnw wnpi bmzy",
    },
  });
  const mailOptions = {
    from: "hiteshpatel4757@gmail.com",
    to: mailto,
    subject: "Registration Success",
    text: "Dear Customer, Your Registeration is SuccessFully done but it is in",
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

//Customer Registration Code
customerRoute.route("/register").post((req, res) => {
  var customer = new Customer(req.body);
  customer
    .save()
    .then((customer) => {
      if (customer != null) {
        // sendGMail(req.body.CEmail);
        res.send("Registration Successfull");
        res.end();
      } else {
        res.send("Registration Failed");
        res.end();
      }
    })
    .catch((err) => {
      res.send(err);
      res.end();
    });
});

//login
customerRoute.route("/login").post((req, res) => {
  var id = req.body.CUserId;
  var pass = req.body.CUserPass;
  Customer.findOne({ $and: [{ CUserId: id }, { CUserPass: pass }] })
    .then((customer) => {
      res.send(customer);
      res.end();
    })
    .catch((err) => {
      res.send(customer);
      res.end();
    })
    .catch((err) => {
      res.send("Something Went Wrong");
      res.end();
    });
});

//get image
customerRoute.route("/getimage/:cpicname").get((req, res) => {
  res.sendFile("C:/VS Code/Web Dev/Coaching UI (Web Dev)/Project/BackEnd/server/customer/customerimages/ " + req.params.cpicname);
});
//image save
const st = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "C:/VS Code/Web Dev/Coaching UI (Web Dev)/Project/BackEnd/server/customer/customerimages");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: st });
customerRoute.post("/savecustomerimage", upload.single("file"), (req, res) => {
  res.json({});
});

//get customer for count
customerRoute.route("/getcustomercount").get((req, res) => {
  Customer.find()
    .then((customer) => {
      res.send(customer);
      res.end();
    })
    .catch((err) => {
      res.send("Something Went Wrong");
      res.end();
    });
});
//get customer details by id
customerRoute.route("/getcustomerdetails/:cid").get((req, res) => {
  var id = req.params.cid;
  Customer.findOne({ Cid: id })
    .then((customer) => {
      console.log(customer);
      res.send(customer);
      res.end();
    })
    .catch((err) => {
      res.send("Something Went Wrong");
      res.end();
    });
});

//get customer List
customerRoute.route("/getcustomerlist").get((req, res) => {
  // var id = req.params.cid;
  Customer.find()
    .then((customer) => {
      console.log(customer);
      res.send(customer);
      res.end();
    })
    .catch((err) => {
      res.send("Something Went Wrong");
      res.end();
    });
});
//enable disable customer by admin
customerRoute.route("/customermanage/:cid/:status").put((req, res) => {
  Customer.updateOne({ Cid: req.params.cid }, { Status: req.params.status })
    .then((req, res) => {
      res.send("Customer Status Updated Successfully");
      res.end();
    })
    .catch((err) => {
      res.send(err);
      res.end();
    });
});
module.exports = customerRoute;