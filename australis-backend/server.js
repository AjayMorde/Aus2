// require('dotenv').config();
const express = require('express');
const server=express()
const connectDb = require('./config/dbConnection');
const errorHandler = require('./middlewares/errorHandler');
const cors=require('cors');
const userSignUp=require('./routes/userRouter');

connectDb();
const app = express();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended:false}));


const port = process.env.PORT || 3000;

app.use(express.json());
// app.use('/', require('./routes'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/user',userSignUp);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
