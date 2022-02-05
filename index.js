const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");

const app = express();

const db = require("./app/Models");
db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to the database!");
    return null;
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    //process.exit();
  });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// simple route
require("./app/routes/user.routes")(app);
require("./app/routes/leads.routes")(app);
require("./app/routes/projects.routes")(app);
require("./app/routes/land.routes")(app);


app.use((req, res, next) => {
  var data = {
    version: "v1",
    rCode: 101,
    results: [],
  };
  res.send(data);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
