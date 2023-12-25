const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import the cors middleware
const userRoutes = require('./src/modules/user/routes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());

app.use(bodyParser.json());
//app.use(express.json());

app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
