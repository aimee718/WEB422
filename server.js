const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const RestaurantDB = require("./modules/restaurantDB.js");
//const router = require('express').Router();

var app = express();
var HTTP_PORT=process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

const dbAddress = "mongodb+srv://aimee718:Aimee718!@cluster0.co6oi.mongodb.net/sample_restaurants?retryWrites=true&w=majority";
const db= new RestaurantDB(dbAddress);

app.get("/", (req, res) => res.send("Hello world999!!!!"));

db.initialize()
.then(()=>{
    app.listen(HTTP_PORT, ()=>{
        console.log(`server listening on: ${HTTP_PORT}`);
    });
})
.catch((err)=>{
    console.log(err);
});

app.get('/api/restaurants', (req, res) => {    
    var page = req.query.page;
    var perPage=req.query.perPage;
    var borough = req.query.borough;
    //console.log(page+'/'+perPage+'/'+borough);
    db.getAllRestaurants(page, perPage, borough)
        .then((data)=>{
            if (!data.length) return res.status(404).send({ err: 'restaurants not found' });
            res.send(`find successfully: ${data}`);
        })
        .catch(err => res.status(500).send(err));
});
//find one by id
app.get('/api/restaurants/:id', (req, res) => {
    db.getRestaurantById(req.params.id)
        .then((data) => {
            if (!data) return res.status(404).send({ err: 'id not found' });
            res.send(`findOne successfully: ${data}`);
            //res.json(todo);
            
        })
        .catch(err => res.status(500).send(err));
  });
//update
  app.put('/api/restaurants/:id',(req,res)=>{
    if(!req.body.content) {
        return res.status(400).send({message: "Body can not be empty"});
    }else{
        var data = req.body;
        var id=req.params.id;
        //var data1 = { name : "nodejsera.com222" };
        //console.log(JSON.stringify(req.body)+'/'+JSON.stringify(data1)+'/'+id);
        
        db.updateRestaurantById(data,id)
            .then(() => {
                res.status(201).json({ message: 'updated successfully!'});
            })
            .catch( (error) => {res.status(400).json({error: error});
            });
    }
      
  });
//delete
  app.delete('/api/restaurants/:id',(req,res)=>{
    if(req.params.id.length < 1) {
        return res.status(400).send({message: "Parmas can not be empty"});
    }else{
        db.deleteRestaurantById(req.params.id)
            .then(() => {
                res.status(200).json({ message: 'Deleted!'});
            })
            .catch(
            (error) => {
                res.status(400).json({ error: error});
            });
    }
  });
// add new
  app.post('/api/restaurants',(req,res)=>{
    console.log(req.body);
    //if(!req.body.content) {
    //    return res.status(400).send({ message: "Body can not be empty-add"});
    //}
    
    db.addNewRestaurant(req.body)
    .then(data => {res.send(data);
    }).catch(err => {
        res.status(500).send({message: err.message || "Some error occurred while Add New Data." });
    });
  });