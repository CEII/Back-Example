require("dotenv").config();
const http = require("http");

const app = require("./app");

const PORT = process.env.API_PORT || 5000;


const server = http.createServer(app);

server.listen(PORT, () => console.log(`Listening on ${ PORT }`));

module.exports = server;
