const express=require('express')
const app=express();
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');


app.use(express.json());
app.use(cors());


const route=require('./routes/route')
app.use('/api/v1',route);


sequelize.sync( ).then((result)=>{
    // console.log(result);
  }) 
  .catch((err)=>{
    console.log(err);
  })
  app.get('/', (req, res) => {
    res.send('Hello, World!');
  });
  
  
  const PORT = process.env.PORT;
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });