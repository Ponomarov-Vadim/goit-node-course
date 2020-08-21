const server = require("./server");

const {
  env: { PORT },
} = process;

const log = (err) => {
  if (err) {
    console.log("Error on listen: ", err);
    process.exit(1);
  }
  console.log(`Server start in ${PORT} port`);
};

server(PORT, log);
