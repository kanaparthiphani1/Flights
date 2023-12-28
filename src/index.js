const express = require("express");
const { ServerConfigs } = require("./config");
const AppRouter = require("./routers");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", AppRouter);

app.listen(ServerConfigs.PORT, () => {
  console.log("APP STARTED");
});
