import Products from '../models/product.js'
import User from '../models/user.js'

User.hasMany(Products, {
    foreignKey: 'userId',
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

Products.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})