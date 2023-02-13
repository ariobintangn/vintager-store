'use strict';
const fs = require('fs')
module.exports = {

  async up (queryInterface, Sequelize) {
    let pictures = JSON.parse(fs.readFileSync('./data/pictures.json','utf-8')).map(el=>{
      delete el.id
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
  })
  return queryInterface.bulkInsert('Pictures',pictures,{})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Pictures',null,{})
  }
};
