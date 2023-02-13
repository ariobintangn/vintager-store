'use strict';
const fs = require('fs')

module.exports = {
  async up (queryInterface, Sequelize) {
    
     let products = JSON.parse(fs.readFileSync('./data/db.json','utf-8')).map(el=>{
      delete el.id
      el.slug = el.name.replace(/\s+/g, '-')
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
  })
  return queryInterface.bulkInsert('Products',products,{})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Products',null,{})
  }
};
