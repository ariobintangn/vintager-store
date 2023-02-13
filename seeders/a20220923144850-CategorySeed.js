'use strict';
const fs = require('fs')
module.exports = {
  async up (queryInterface, Sequelize) {
      let categories = JSON.parse(fs.readFileSync('./data/categories.json','utf-8')).map(el=>{
        delete el.id
        el.createdAt = new Date()
        el.updatedAt = new Date()
        return el
    })
    return queryInterface.bulkInsert('Categories',categories,{})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Categories',null,{})
  }
};
