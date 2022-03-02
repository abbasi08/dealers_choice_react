const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/acme_desserts"
);

const Dessert = sequelize.define("dessert", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = {
  sequelize,
  Dessert,
};
