const express =require('express');
const stateRoute =express.Router();
var State = require('./state.model');

//save State
stateRoute.route('/save').post((req,res)=>{
    var state=new State(req.body);
    state.save().then(state =>{
        res.send('Data Saved');
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    });

});

//show all State
stateRoute.route('/show').get((req,res)=>{
    State.find().then((state)=>{
        res.send(state);
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    });
});

//search State
stateRoute.route('/search/:stid').get((req,res)=>{
    State.findOne({"StId":req.params.stid}).then((state)=>{
        res.send(state);
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    });
});
//update State
stateRoute.route('/update').put((req,res)=>{
    // var state=new State(req.body);
    State.updateOne({"StId":req.body.StId},{"StId":req.body.StId,"StName":req.body.StName,
        "Status":req.body.Status}).then(state =>{
        res.send('Data Updated successfully');
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    });

});
//delete state:-  modify state status active  to inactive
stateRoute.route('/delete/:stid').delete((req,res)=>{
    State.updateOne({"StId":req.params.stid},
        {"Status":"Inactive"}).then(state =>{
        res.send('Data Deleted');
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    });

});
module.exports =stateRoute;