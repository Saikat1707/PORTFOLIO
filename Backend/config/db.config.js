const mongoose = require('mongoose');

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.log('MongoDB connection failed:', err);
    process.exit(1); // stops the server if DB fails
  }
};

module.exports = connection;
