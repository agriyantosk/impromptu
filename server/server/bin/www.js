// <<<<<<< finalize
require('dotenv').config()
const { run } = require('../config/connection')
const app = require("../app");
const port = process.env.PORT || 3002


run().then(() => {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
  });