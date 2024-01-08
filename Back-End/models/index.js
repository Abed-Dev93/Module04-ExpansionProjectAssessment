import { Sequelize } from "sequelize"
import 'dotenv/config'
import Product from './product.js'
import User from './user.js'

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
      host: process.env.DB_HOST,
      dialect: 'mysql'
  }
)

const userModel = new User(sequelize, Sequelize)
const productModel = new Product(sequelize, Sequelize)

const db = {
  sequelize,
  Sequelize,
  userModel,
  productModel
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

export default db