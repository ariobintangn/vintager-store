'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "product name is required!"
          },
          notEmpty: {
            msg: "product name cannot be empty!"
          }
        }
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "slug is required!"
          },
          notEmpty: {
            msg: "slug cannot be empty!"
          }
        }
      },
      description: {
        type: Sequelize.STRING(1000),
        allowNull: false,
        validate: {
          notNull: {
            msg: "description cannot be null!"
          },
          notEmpty: {
            msg: "description cannot be empty!"
          }
        }
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        min: 100000,
        validate: {
          notNull: {
            msg: "price cannot be null!"
          },
          notEmpty: {
            msg: "price cannot be empty!"
          }
        }
        
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      mainImg: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "image is required!"
          },
          notEmpty: {
            msg: "image cannot be empty!"
          }
        }
      },
      secondaryImg: {
        type: Sequelize.STRING
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Categories",
          key: "id"
        }
      },
      authorId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};