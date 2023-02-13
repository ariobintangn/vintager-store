'use strict';
const fs = require('fs')
const {hashPassword} = require('../helpers/bcrypt')

module.exports = {
  async up (queryInterface, Sequelize) {
    let users = JSON.parse(fs.readFileSync('./data/users.json','utf-8')).map(el=>{
      delete el.id
      el.createdAt = new Date()
      el.updatedAt = new Date()
      el.password = hashPassword(el.password)
      return el
      return el
  })
  return queryInterface.bulkInsert('Users',users,{})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users',null,{})
  }
};
