const express = require('express');
var cors = require('cors')

const bodyParser = require('body-parser');

var app = express();

app.use(cors())
app.use(express.json());

app.use(bodyParser.urlencoded({ extended:false}))
app.use(bodyParser.json())

// defining routes 
const profileManagement = require('./routes/profileManagement');
app.use('/profile', profileManagement);

const userFeature = require('./routes/userFeature');
app.use('/userfeature', userFeature);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
