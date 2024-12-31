const express = require('express');
const dotenv = require('dotenv');
const connectToDB = require('./db/connectToDB')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;


const productRoute = require('./routes/product.route');
const userRoute = require('./routes/userAuth.route');

dotenv.config();
cloudinary.config({
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
          api_key: process.env.CLOUDINARY_API_KEY,
          api_secret: process.env.CLOUDINARY_API_SECRET
})
const app = express();
const port = 3000;
const allowedOrigins = [
          "http://localhost:5173",
          "http://localhost:3000",
          "https://example.com",
];
app.use(express.json());
app.use(cookieParser());
app.use(cors({
          origin: function (origin, callback) {
                    if (allowedOrigins.includes(origin) || !origin) {
                              callback(null, true);
                    } else {
                              callback(new Error('Not allowed by CORS'));
                    }
          },
          credentials: true
}));


app.use('/api/products', productRoute);
app.use('/api/users', userRoute);


app.get('/', (req, res) => {
          res.send("hello");
})

app.listen(port, () => {
          connectToDB();
          console.log(`Server is running on port ${port}`)
});