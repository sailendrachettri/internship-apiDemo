const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();
const PORT = process.env.PORT || 8000;
const app = express();

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth/user', require('./router/auth.js'));

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});

