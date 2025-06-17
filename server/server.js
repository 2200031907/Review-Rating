const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();
app.use(cors());
 app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

app.use('/', reviewRoutes);


const PORT = 5000;
      app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
     });


     