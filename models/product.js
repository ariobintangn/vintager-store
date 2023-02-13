'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {

    static associate(models) {
      Product.hasMany(models.Picture, {foreignKey: "productId"}),
      Product.belongsTo(models.User, {foreignKey: "authorId"}),
      Product.belongsTo(models.Category, {foreignKey: "categoryId"})
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "cannot be empty"
        },
      }
    },
    slug: DataTypes.STRING,
    description: DataTypes.STRING(1000),
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    mainImg: DataTypes.STRING,
    secondaryImg: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};