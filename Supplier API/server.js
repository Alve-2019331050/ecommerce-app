const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require("dotenv");
const orderRoutes = require('./routes/orderRoutes');
const balanceRoutes = require('./routes/balanceRoutes');

//configure env
dotenv.config();

app.use(cors());
app.use(express.json());

//config database
connectDB();

//routes
app.use('/api/supplier/supply-product',orderRoutes);
//get balance
app.use('/api/supplier/get-balance',balanceRoutes);

//PORT
const PORT = process.env.PORT || 8081;


app.listen(PORT, () => {
    console.log(`Supplier Running on port ${PORT}`);
});