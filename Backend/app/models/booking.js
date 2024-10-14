import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    startDate:{
        type: String,
        required: true
    },
    endDate:{
        type: String,
        required: true
    },
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;