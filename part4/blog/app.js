const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const blogRoutes = require('./controllers/blogRouter');
const userRoutes = require('./controllers/userRouter');
const app = express();
const config = require('./utils/config');

const mongoUrl = config.MONGODB_URI
mongoose.set('useUnifiedTopology', true);
mongoose.connect(mongoUrl, { useNewUrlParser: true })


app.use(cors())
app.use(bodyParser.json())

app.use('/api/blogs', blogRoutes)
app.use('/api/users', userRoutes)

module.exports = app;