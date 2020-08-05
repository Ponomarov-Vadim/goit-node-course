const server = require("./server");

const log = (err) => {
  if (err) throw console.log(err);
  console.log(`Server start in ${process.env.PORT} port`);
};

server(process.env.PORT, log);
