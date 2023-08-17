const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require("dotenv");

//configure env
dotenv.config();


//middlewares
app.use(cors());
app.use(express.json());

//config database
connectDB();

//PORT
const PORT = process.env.PORT || 8082;

//routes

//Bank api
const bankRoutes = require('./routes/bankRoutes');
app.use('/api/bank', bankRoutes);


//rest api
app.get('/', (req, res) => {
    res.send(
        "<h1>Welcome to Bank</h1>"
    );
});

app.listen(PORT, () => {
    console.log(`Bank Running on port ${PORT}`);
});