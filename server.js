const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const RestaurantDB = require("./modules/restaurantDB.js");
//const router = require('express').Router();

var app = express();
var HTTP_PORT=3000;

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