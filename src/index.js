const express = require('express');
const rateLimit = require('express-rate-limit');
const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
const cors = require('cors');

const app = express();
app.use(cors({
	origin: 'http://localhost:3000',
	methods: 'GET,POST,PUT,DELETE',
	allowedHeaders: ['Content-Type', 'Authorization'],
  }));
const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 2 minutes 
	max: 30, // Limit each IP to 3 requests per `window` (here, per 2 minutes)
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(limiter);
app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});
