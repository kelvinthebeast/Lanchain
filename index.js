const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser')
const database = require('./config/database');
const port = process.env.PORT || 8686;
database.connectDB();
const systemConfig = require("./config/system"); 
app.use(bodyParser.json()); // when post data can parse json into req.body


const routesApiVer1 = require("./api/v1/routes/index.route")

routesApiVer1(app); 
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
