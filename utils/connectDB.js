import mongoose from 'mongoose';

const connectMongo = async () => mongoose.connect("mongodb+srv://aakash:aakash1234@cluster0.s9xhsa8.mongodb.net/?retryWrites=true&w=majority");

export default connectMongo;