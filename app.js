const express = require('express');
const app = express();
const userRoutes = require('./routes/user.routes');
const loginRoute = require('./routes/login.route');

app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/login', loginRoute);

module.exports = app;
