const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require("body-parser");
const cors = require("cors");
let pool = require('./config');
const defaultRoute = require("./routes/dataRoute");
const { connectionString, dbName } = require('./dbConfig');
const app = express();

app.use(bodyParser.json());
app.use(cors());

const config = {
  user: 'wis_prod_25may_usr',
  password: 'wis_prod_25may_usr',
  server: '103.208.202.180',
  database: 'WIS_PROD_25MAY',
  options: {
    encrypt: true,
    trustServerCertificate: true,

  }
};


async function connectToDatabase() {
  try {
    // Create a new connection pool
    const connectionString = await pool.connect().then(()=>{
      console.log("connected");
    }).catch((err)=>{
      console.log(err);
    })
  } catch (err) {
    console.error('Error connecting to the database:', err);
    throw err; // Handle the error further up the call stack
  }
}

// Call the function to establish the connectio
connectToDatabase()
  .catch((err) => {
    // Handle any error that occurred during connection
    console.error('Error establishing connection:', err);
});

mongoose.connect(connectionString,{dbName: dbName}).then(()=>{
  console.log("mongodb connected");
}).catch((err)=>{
    console.log(err);
})




app.use("/api/v1",defaultRoute);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

