const app = require('./app');
const port = 3001;

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
