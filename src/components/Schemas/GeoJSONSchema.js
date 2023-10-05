
const mongoose = require('mongoose');

const GeoJSONSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      properties: {
        OBJECTID_1: {
            type: Number,
            required: false,
        },
        OBJECTID:{
            type: Number,
            required: false,
        },
        District_Num:{
            type: Number,
            required: false,
        },
        District:{
            type: Number,
            required: false,
        },
        SHAPE_Leng:{
            type: Number,
            required: false,
        },
        FirstName: {
            type: String,
            required: false,
        },
        LastName: {
            type: String,
            required: false,
        },
        Room: {
            type: String,
            required: false,
        },
        PaymentMethodChangeEventarty: {
            type: String,
            required: false,
        },
        Capitol_Phone: {
            type: String,
            required: false,
        },
        District_Phone: {
            type: String,
            required: false,
        },
        Email_Address: {
          type: String,
          required: false,
        },
        Shape__Area:{
            type: Number,
            required: false,
        },
        Shape__Length:{
            type: Number,
            required: false,
        },
      },
      geometry: {
        type: {
          type: String,
          required: true,
        },
        coordinates: {
          type: [[[Number]]],
          required: true,
        },
      },
});
  
const GeoJSONModel = mongoose.model('Virginia', GeoJSONSchema);
  
module.exports = GeoJSONModel;