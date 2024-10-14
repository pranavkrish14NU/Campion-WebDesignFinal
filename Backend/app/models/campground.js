// Importing mongoose library
import mongoose from 'mongoose';

// Creating a mongoose schema for the Campground model
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    // Attributes of the campground and its required field
name: {
    type: String,
    required: true
},

location:{
    type: String,
    required: true
},
type:{
    type: String,
    required: true
},
description:{
    type: String,
    required: true
},
price:{
    type: Number,
    required: true
},

imageUrl:{
    type: String,
    required: true
},
reviews:[
    {
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }
],

booking:[
    {
    type: Schema.Types.ObjectId,
    ref: 'Booking'
}
],
author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
},
geometry: {
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
},


},
{
    versionKey: false
}
);

const CampgroundModel = mongoose.model('campground', CampgroundSchema);

// Exporting CampgroundModel 

export default CampgroundModel;