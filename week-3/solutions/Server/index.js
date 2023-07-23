const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

const app = express();


app.use(express.json());
app.use(cors());

app.use('/admin', adminRouter);
app.use('/users', userRouter);



// Connect to MongoDB
// DONT MISUSE THIS THANKYOU!!
mongoose.connect('mongodb+srv://kirattechnologies:iRbi4XRDdM7JMMkl@cluster0.e95bnsi.mongodb.net/courses', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" });

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
