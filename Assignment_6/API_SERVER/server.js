const express = require("express");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const passport = require("passport");
const passportJWT = require("passport-jwt");
const dataService = require("./data-service.js");
const userService = require("./user-service.js");
const bodyParser = require('body-parser');

const app = express();

// JSON Web Token Setup
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

// Configure its options
var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");

// IMPORTANT - this secret should be a long, unguessable string 
// (ideally stored in a "protected storage" area on the 
// web server, a topic that is beyond the scope of this course)
// We suggest that you generate a random 64-character string
// using the following online tool:
// https://lastpass.com/generatepassword.php 

//jwtOptions.secretOrKey = '&0y7$noP#5rt99&GB%Pz7j2b1vkzaB0RKs%^N^0zOP89NT04mPuaM!&G8cbNZOtH';
require('dotenv').config();
jwtOptions.secretOrKey = process.env.JWT_SECRET;
var g_id;
var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log('payload received', jwt_payload);

    if (jwt_payload) {
        // The following will ensure that all routes using 
        // passport.authenticate have a req.user._id, req.user.userName, req.user.fullName & req.user.role values 
        // that matches the request payload data
        next(null, { _id: jwt_payload._id, 
            userName: jwt_payload.userName, 
            fullName: jwt_payload.fullName, 
            role: jwt_payload.role }); 
            g_id = jwt_payload._id;
    } else {
        next(null, false);
    }
});

// tell passport to use our "strategy"
passport.use(strategy);

// add passport as application-level middleware
app.use(passport.initialize());

app.use(bodyParser.json());
app.use(cors());

const HTTP_PORT = process.env.PORT || 8080;

// app.get("/api/vehicles",passport.authenticate('jwt', { session: false }), (req,res)=>{
//     dataService.getAllVehicles().then((data)=>{
//         res.json(data);
//     }).catch(()=>{
//         res.status(500).end();
//     });
// });

app.get("/api/favourites",passport.authenticate('jwt', { session: false }), (req,res)=>{
    //console.log("check../api/fav..."+req.user._id);
    userService.getFavourites(req.user._id)
        .then((user) => {
            //console.log("at server0...>"+ JSON.stringify(user));
           // var payload = { 
           //_id: user._id,
           //userName: user.userName,
           // fullName: user.fullName,
           //role: user.role,
           //    favourites:user.favourites
           // };            
           res.json(user);
        }).catch((msg) => {
            res.status(422).json({ "message": msg });
        });
});

app.put("/api/favourites/:id",passport.authenticate('jwt', { session: false }), (req,res)=>{
    
    if(!req.body) {
        return res.status(400).send({message: "Body can not be empty"});
    }else{
        //console.log("fav..id..>"+ req.params.id+"/"+JSON.stringify(req.body)+"..."+req.body.id);
        //console.log("server..fav_id..token..>"+ req.params.id+"/"+ this.token);
        var id = req.body.id;
        var fav_id = req.body.favourites;//favourites id

        userService.addFavourite(req.body.id,req.body.favourites)
        .then(()=>{
            res.status(201).json({ message: 'updated successfully!'})
        })        
        .catch((error)=>{
            res.status(400).json({error: error});
        });

    }
});

app.delete("/api/favourites/:id",passport.authenticate('jwt', { session: false }), (req,res)=>{
    //console.log("after...split...>"+req.user._id +"/"+g_id);
    if(!req.body) {
        return res.status(400).send({message: "Parmas can not be empty"});
    }else{
       
        var id = req.user._id;
        var fav_id=req.params.id;
        //console.log("after...split222...>"+id+"/"+fav_id);
        userService.removeFavourite(id,fav_id)
        .then(() => {
            res.status(200).json({ message: 'Deleted!'});
        })
        .catch(
        (error) => {
            res.status(400).json({ error: error});
        });
    }
});

app.post("/api/register", (req, res) => {

    userService.registerUser(req.body)
        .then((msg) => {
            res.json({ "message": msg });
        }).catch((msg) => {
            res.status(422).json({ "message": msg });
        });
});

app.post("/api/login", (req, res) => {
    userService.checkUser(req.body)
        .then((user) => {
            
            var payload = { 
                _id: user._id,
                userName: user.userName,
                fullName: user.fullName,
                role: user.role,
                favourites:user.favourites
            };

            var token = jwt.sign(payload, jwtOptions.secretOrKey);//토큼 생성
            res.json({ "message": "login successful", "token": token });//메시지 받음
        }).catch((msg) => {
            res.status(422).json({ "message": msg });
        });
});



app.use((req, res) => {
    res.status(404).end();
});

userService.connect().then(()=>{
    app.listen(HTTP_PORT, ()=>{console.log("API listening on: " + HTTP_PORT)});
})
.catch((err)=>{
    console.log("unable to start the server: " + err);
    process.exit();
});
