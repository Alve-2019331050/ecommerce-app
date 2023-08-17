const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require("dotenv");

//configure env
dotenv.config();

app.use(cors());
app.use(express.json());

//config database
connectDB();

//PORT
const PORT = process.env.PORT || 8081;


app.listen(PORT, () => {
    console.log(`Supplier Running on port ${PORT}`);
});