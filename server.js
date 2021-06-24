/*********************************************************************************
* WEB422 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Aimee Lee    Student ID: 056342132 Date: 01-22-2020
* Heroku Link: https://web422-restaurants.herokuapp.com/
*
********************************************************************************/ 

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const RestaurantDB = require("./modules/restaurantDB.js");

var app = express();
var HTTP_PORT=process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

const dbAddress = "mongodb+srv://aimee718:Aimee718!@cluster0.co6oi.mongodb.net/sample_restaurants?retryWrites=true&w=majority";
//const dbAddress = "mongodb+srv://john821:7789@Pos7789@cluster0.7oi1d.mongodb.net/sample_restaurants?retryWrites=true&w=majority";
const db= new RestaurantDB(dbAddress);

app.get("/", (req, res) => res.send("Hello world!!!!"));

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

    db.getAllRestaurants(page, perPage, borough)
        .then((data)=>{
            if (!data.length) return res.status(404).send({ err: 'restaurants not found' });
            res.send(`find successfully: ${data}`);
        })
        .catch(err => res.status(500).send(err));
});

app.get('/api/restaurants/:id', (req, res) => {
    db.getRestaurantById(req.params.id)
        .then((data) => {
            if (!data) return res.status(404).send({ err: 'id not found' });
            res.send(`findOne successfully: ${data}`);
            
        })
        .catch(err => res.status(500).send(err));
  });

  app.put('/api/restaurants/:id',(req,res)=>{
    if(req.params.id.length < 1)  {
        return res.status(400).send({message: "Body can not be empty"});
    }else{
        var data = req.body;
        var id=req.params.id;
        console.log("aaa="+JSON.stringify(req.body)+'/'+id);
        
        db.updateRestaurantById(data,id)
            .then(() => {
                res.status(201).json({ message: 'updated successfully!'});
            })
            .catch( (error) => {res.status(400).json({error: error});
            });
    }
      
  });

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

app.post('/api/restaurants',(req,res)=>{
    console.log(req.body);
    
    db.addNewRestaurant(req.body)
    .then(data => {res.send(data);
    }).catch(err => {
        res.status(500).send({message: err.message || "Some error occurred while Add New Data." });
    });
  });