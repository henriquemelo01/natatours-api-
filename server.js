// Arquivo que contém configurações do server, banco de dados, etc...

const app = require('./app');

// START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`Server started to listen requests on port ${port}`);
});
