const express = require("express");
const app = express();
const cors = require("cors");
const imgsRoutes = require("./routes/imgsRoute");

app.use(cors());
app.use(express.json());

app.use("/imgs", imgsRoutes);

app.listen(8000, () => {
  console.log("server run on port 8000");
});
