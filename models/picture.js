'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Picture extends Model {

    static associate(models) {
      Picture.belongsTo(models.Product, {foreignKey: "productId"})
    }
  }
  Picture.init({
    imgUrl: DataTypes.STRING,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Picture',
  });
  return Picture;
};