const express = require("express");
// const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require('dotenv');
const connectDb = require("./config/db");


//dot env configuration 
dotenv.config();

//DB connection
connectDb();


//rest object
const app = express();
const port = process.env.port || 4040;

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/test' , require('./routes/testRoutes')); 
app.use('/api/v1/auth', require('./routes/authRoutes'));

//route
app.get("/", (req, res) => {
    return res.status(200).send("<h1> Welcome to Restraunt</h1>");
});



//listen
app.listen(port, () => {
    console.log(`Server Running`);
});
