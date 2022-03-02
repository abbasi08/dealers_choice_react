const { sequelize } = require("./db");
const { Dessert } = require("./db");

const express = require("express");
const server = express();
const path = require("path");

//server.use(express.static(path.join(__dirname, "..", "public")));

server.get("/", (req, res) => res.redirect("/desserts"));
server.get("/desserts", (req, res) =>
  res.sendFile(path.join(__dirname, "index.html"))
);

server.get("/desserts", async (req, res, next) => {
  try {
    res.send(await Dessert.findAll());
  } catch (error) {
    next(error);
  }
});

// server.post("/desserts", async (req, res, next) => {
//   try {
//     res.status(201).send(await Dessert.create({}));
//   } catch (error) {
//     next(error);
//   }
// });

server.delete("/desserts/:id", async (req, res, next) => {
  try {
    const dessert = await Dessert.findByPk(req.params.id);
    await dessert.destroy();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

const start = async () => {
  try {
    await sequelize.sync({ force: true });

    const cookies = await Dessert.create({ name: "cookies" });
    const iceCream = await Dessert.create({ name: "ice cream" });
    const cake = await Dessert.create({ name: "cake" });

    const port = process.env.PORT || 3000;
    server.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
