require('dotenv').config();
const express = require('express');

const connectDB = require('./config/database');

const productRoute = require('./routes/productRoute');

const userRoute = require('./routes/userRoute');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/api', productRoute);

app.use('/api', userRoute);

app.get('/', (req, res) => {
    res.json({message: "INVENTORY API IS RUNNING PERFECTLY"});
});

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
