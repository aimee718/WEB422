const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    address: {
        building: String,
        coord: [Number],
        street: String,
        zipcode: String
    },
    borough: String,
    cuisine: String,
    grades: [{
        date: Date,
        grade: String,
        score: Number
    }],
    name: String,
    restaurant_id: String
});

module.exports = class RestaurantDB{
    constructor(connectionString){
        this.connectionString = connectionString;
        this.Restaurant = null; // no "Restaurant" object until "initialize" is complete
    }

    initialize(){
        return new Promise((resolve,reject)=>{
           let db = mongoose.createConnection(this.connectionString,{ useNewUrlParser: true,useUnifiedTopology: true });
           
            db.on('error', ()=>{
                reject();
            });
            db.once('open', ()=>{
                this.Restaurant = db.model("restaurants", restaurantSchema);
                resolve();
            });
        });
    }

    async addNewRestaurant(data){
        let newRestaurant = new this.Restaurant(data);
        await newRestaurant.save();
        return `new restaurant: ${newRestaurant._id} successfully added`
    }
    
    getAllRestaurants(page, perPage, borough){ 
        let findBy = borough ? { borough } : {};

        if(+page && +perPage){
            return this.Restaurant.find(findBy).sort({restaurant_id: +1}).skip(page * +perPage).limit(+perPage).exec();
        }
        
        return Promise.reject(new Error('page and perPage query parameters must be present'));
    }

    getRestaurantById(id){
        return this.Restaurant.findOne({_id: id}).exec();
    }

    async updateRestaurantById(data, id){
        await this.Restaurant.updateOne({_id: id}, { $set: data }).exec();
        return `restaurant ${id} successfully updated`;
    }

    async deleteRestaurantById(id){
        await this.Restaurant.deleteOne({_id: id}).exec();
        return `restaurant ${id} successfully deleted`;
    }
}