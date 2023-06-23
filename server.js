const express = require("express");
const app = express();
const port = 3000;
const api = require("./routes/api");
const cors = require("cors");
const cookie_parser = require("cookie-parser");

app.use(express.json());
app.use(cors());
app.use("/api", api);
app.use(cookie_parser());

app.get("/", async (req, res) => {
  res.send("Hi World!");
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
