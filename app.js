const express = require("express");
const app = express();
require("dotenv").config();
require("./src/db/dbConnections");
const port = process.env.PORT || 3000;
const router = require("./src/routers/index"); 
const errorHandlerMiddleware = require("./src/middlewares/errorHandler");
const cors = require("cors");
const corsOptions=require("./src/helpers/corsOptions");

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

//Cors middleware
app.use(cors(corsOptions))

app.use("/api", router);



app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

// Hata yakalama middleware'i
app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
