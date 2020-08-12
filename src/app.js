const server = require("./server");

const {
  env: { PORT },
} = process;

const log = (err) => {
  if (err) {
    console.log("Erroe on listen: ", err);
    process.exit(0);
  }
  console.log(`Server start in ${PORT} port`);
};

server(PORT, log);
