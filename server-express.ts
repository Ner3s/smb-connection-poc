import Express from "express";

const App = Express();
const port = 3333;

App.get("/", (req, res) => {
  res.send("Hello World!");
});

App.use('/files', Express.static("./storage"));
App.listen(port, () => {
  console.log("Server running!");
});