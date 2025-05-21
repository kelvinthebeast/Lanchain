const mongoose = require('mongoose');

module.exports.connectDB = async () => {

  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    
    
  }
}