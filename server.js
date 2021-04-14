const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// process.env.NODE_ENV = 'development';

const app = require('./app');

// console.log(process.env);

// START SERVER
const port = 3000 || process.env.PORT;
app.listen(port, () => {
  console.log(`Server started to listen requests on port ${port}`);
});
