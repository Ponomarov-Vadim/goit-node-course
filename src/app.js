const { app } = require("./server");

app.listen(process.env.PORT, (err) => {
  if (err) return console.log(err);
  console.log(`Server started an Port:${process.env.PORT}`);
});
