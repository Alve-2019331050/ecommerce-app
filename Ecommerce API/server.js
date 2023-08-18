const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/authRoute');
const buyRoutes = require('./routes/buyRoute');
const connectDB = require('./config/db');
const dotenv = require("dotenv");

//configure env
dotenv.config();

app.use(cors());
app.use(express.json());

//config database
connectDB();

//PORT
const PORT = process.env.PORT || 8080;

//routes
app.use('/api/auth', authRoutes);
app.use('/api/buy', buyRoutes);


app.listen(PORT, () => {
    console.log(`Ecommerce Organization Running on port ${PORT}`);
});