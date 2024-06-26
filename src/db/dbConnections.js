const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Veritabanı bağlantısı başarılı");
  })
  .catch((err) => {
    console.log("Veritabanı bağlantısı başarısız", err);
  });

module.exports = mongoose;