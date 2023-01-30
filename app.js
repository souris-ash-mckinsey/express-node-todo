const express = require('express');
const { todoRoute } = require('./src/routes/todo');

const app = express();
app.use(express.json());

const port = process.env.PORT || 8002;

app.use('/', todoRoute);

app.listen(port, () => {
  console.log(`TODO app listening on port ${port}`);
});