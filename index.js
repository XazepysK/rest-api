const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
app.enable("trust proxy");
app.set("json spaces", 2);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use((req, res, next) => {
  const og = res.json;
  res.json = function (data) {
    if (data && typeof data === 'object') {
      const resp = {
        status: data.status,
        creator: "XazepysK",
        ...data
      };
      return og.call(this, resp);
    }
    return og.call(this, data);
  };
  next();
});
const apiFolder = path.join(__dirname, './lib/api');
fs.readdirSync(apiFolder).forEach((subfolder) => {
  const subfolderPath = path.join(apiFolder, subfolder);
  if (fs.statSync(subfolderPath).isDirectory()) {
    fs.readdirSync(subfolderPath).forEach((file) => {
      const filePath = path.join(subfolderPath, file);
      if (path.extname(file) === '.js') {
        require(filePath)(app);
        console.log(`Loaded Route: ${path.basename(file)}`);
      }
    });
  }
});
app.use((req, res, next) => {
    res.status(404).json({
      message: "404 - not found"
    });
});
app.use((err, req, res, next) => {
    res.status(500).json({
      message: "500 - something went wring"
    });
});
app.listen(PORT, () => { console.log(`connected on localhost:${PORT}`) })
