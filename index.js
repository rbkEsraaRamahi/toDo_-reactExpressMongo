const express = require('express')
var cors = require('cors')
const app = express()
const port = 5000
var mongoose = require('mongoose');
const ToDo = require("./db");
 
// parse application/json
app.use(express.json());

app.use(cors())



app.get('/', function(req, res){
  ToDo.find({}, function(err, data){
    if(err){
        console.log(err);
        return
    }

    if(data.length == 0) {
        console.log("No record found")
        return
    }

    console.log(data);
    res.json(data)
  })
})

app.post('/', function(req, res){
  ToDo.create({task:req.body.task}, function(err, data){
    if(err){
        console.log(err);
        return
    }

    if(data.length == 0) {
        console.log("No record found")
        return
    }

    console.log(data);
    res.json(data)
  })
})

app.put('/', function(req, res){
  var id = req.body._id;
  var task = req.body.task;
  ToDo.findByIdAndUpdate(id,{$set:{task:task}},{new:true}, function(err, doc){
    if (err) return res.send(500, { error: err });
    return res.send("succesfully saved");
  })
})

app.delete('/', function(req, res){
  var id = req.body._id;
  ToDo.findByIdAndRemove(id, function(err, doc){
    if (err) {console.log(err) 
      return }
    return res.json(doc);
  })
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))