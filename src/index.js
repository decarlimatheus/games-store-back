const express = require("express");
const app = express();
const port = 5000;
const conn = require("./db/conn");

//import routes
const gamesRoutes = require("./routes/gamesRoutes");
const userRoutes = require("./routes/userRoutes");
const userGamesRoutes = require("./routes/userGamesRoutes");

app.use(express.json());

//routes
app.use(userRoutes);
app.use(gamesRoutes);
app.use(userGamesRoutes);

conn
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`App rodando na porta ${port}`);
    });
  })
  .catch((err) => console.log(err));
