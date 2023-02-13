const { Product, User, Category, sequelize, Picture } = require('../models')

class ProductController {

    static async categories(req,res,next){
        try {
            const categories = await Category.findAll()

            res.status(200).json(categories)
        } catch (error) {
            next(error)
        }
    }

    static async createCategory (req,res,next) {
        console.log("<<< MASUK CONTROLLER CATEGORY");
        const t = await sequelize.transaction();
        try {
            let user = await User.findByPk(+req.user.id, {
                attributes: ['username']
            });

            const {name} = req.body
            const newCategory = await Category.create({
                name
            }, { transaction: t })

            await t.commit();

            res.status(201).json({
                newCategory
            })

        } catch (error) {
            console.log(error);
            await t.rollback();
            next(error);
        }
    }

    static async deleteCategory (req, res, next) {
        const t = await sequelize.transaction();

        try {
            const category = await Category.findByPk(+req.params.id)

            if (!category){
                throw{name: "ProductIdNotFound"}
            }
            // await Image.destroy(
            //     {
            //       where: { productId: req.params.id },
            //     },
            //     { transaction: t }
            //   );
              await Category.destroy(
                {
                  where: {
                    id: req.params.id,
                  },
                },
                { transaction: t }
              );


            res.status(200).json({ message: `Category with id: ${+req.params.id} has been deleted` })
        } catch (error) {
            console.log(error);
            await t.rollback()
            next(error)
        }
    }

    static async products(req,res,next){
        try {
            const products = await Product.findAll({
                include: [
                    {
                        model: User,
                    },
                    {
                        model: Category,
                    }
                ]
            })

            res.status(200).json(products)
        } catch (error) {
            next(error)
        }
    }

    static async createProduct (req,res,next) {
        console.log("<<< MASUK CONTROLLER SERVER");
        const t = await sequelize.transaction();
        try {
            let user = await User.findByPk(+req.user.id, {
                attributes: ['username']
            });

            const {name, description, price, stock, mainImg, categoryId} = req.body
            const newProduct = await Product.create({
                name,
                slug: name.replace(/\s+/g, '-'),
                description,
                price,
                stock,
                mainImg,
                categoryId: Number(categoryId),
                authorId: req.user.id
            }, { transaction: t })

            const images = [
                {
                    productId: newProduct.id,
                    imgUrl: req.body.imgUrl1
                },
                {
                    productId: newProduct.id,
                    imgUrl: req.body.imgUrl2
                },
                {
                    productId: newProduct.id,
                    imgUrl: req.body.imgUrl3
                },
            ]

            const additionalImages = await Picture.bulkCreate(images, {transaction: t})

            await t.commit();

            res.status(201).json({
                newProduct, additionalImages
            })

        } catch (error) {
            console.log(error);
            await t.rollback();
            next(error);
        }
    }

    static async deleteProduct (req, res, next) {
        const t = await sequelize.transaction();

        try {
            const product = await Product.findByPk(+req.params.id)

            if (!product){
                throw{name: "ProductIdNotFound"}
            }
            // await Image.destroy(
            //     {
            //       where: { productId: req.params.id },
            //     },
            //     { transaction: t }
            //   );
              await Product.destroy(
                {
                  where: {
                    id: req.params.id,
                  },
                },
                { transaction: t }
              );


            res.status(200).json({ message: `Product with id: ${+req.params.id} has been deleted` })
        } catch (error) {
            console.log(error);
            await t.rollback()
            next(error)
        }
    }

    static async productById(req, res, next) {
        try {

            const { id } = req.params

            const product = await Product.findOne({
                where: { id },
                include: [
                    {
                        model: Picture
                    }
                ]
            })

            if (!product) {
                throw ({ name: "ProductIdNotFound" })
            }

            res.status(200).json({
                message: "success shown product",
                product
            })

        } catch (error) {
            next(error)
        }
    }

    static async updateProduct(req, res, next) {
        const t = await sequelize.transaction();
        try {
            console.log("MASUK CONTROLLER NIH");
            let id = req.params.id
            const { name, description, price, stock, mainImg, categoryId, imgUrl1, imgUrl2, imgUrl3 } = req.body;

            console.log(imgUrl1, "<<<IKI IMAGENNYA");

            let user = await User.findByPk(+req.user.id, {
                attributes: ['email']
            });

            let data = await Product.findByPk(+id)

            if (!data) {
                throw { name: "ProductIdNotFound" }
            }

            await Product.update(
                { name, description, price, stock, mainImg, categoryId },
                {
                    where: {
                        id
                    }
                },  
                {transaction: t })

                const images = [
                    {
                        productId: req.params.id,
                        imgUrl: imgUrl1
                    },
                    {
                        productId: req.params.id,
                        imgUrl: imgUrl2
                    },
                    {
                        productId: req.params.id,
                        imgUrl: imgUrl3
                    },
                ]

                console.log(imgUrl1, imgUrl2, imgUrl3);
    
                const additionalImages = await Picture.bulkCreate(images, {transaction: t})
            
            

            await t.commit();
            res.status(200).json({ message: `product with name ${data.name} has been updated, also pictures ${additionalImages}` })


        } catch (error) {
            next(error)
            await t.rollback()

        }

    }

    static async updateProduct(req, res, next) {
        try {
            let id = req.params.id
            const {name, description, price, stock, mainImg, categoryId } = req.body;
            // let user = await User.findByPk(+req.user.id, {
            //     attributes: ['email']
            // });

            let data = await Product.findByPk(+id)

            if (!data) {
                throw { name: "ProductIdNotFound" }
            }

            const updated = await Product.update(
                { id, name, description, price, stock, mainImg, categoryId },
                {
                    where: {
                        id
                    }
                })

            console.log(updated);


            res.status(200).json({ message: `product updated` })


        } catch (error) {
            next(error)

        }

    }
}

module.exports = ProductController