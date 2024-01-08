import Product from "../models/product.js"
import User from '../models/user.js'

export const createProduct = async (req, res) => {
    const { title, category, description, price, supplier } = req.body
    const id = req.params.id
    if (!title || !category || !description || !price || !supplier)
        return res.status(400).send('All fields are required!')
    try {
        const user = await User.findOne({ where: { id: id } })
        if (!user)
            return res.status(404).send('You are not authorized to create Products!')
        const newProduct = await Product.create({
            title, category, description, price, supplier, userId: id
        })
        return res.status(200).json({ message: 'Product created successfully!', Product: newProduct })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server Error" });
      }
}

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll()
        return res.status(200).json({ Products: products })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server Error" });
      }
}

export const getProductById = async (req, res) => {
    const id = req.params.id
    try {
        const product = await Product.findOne({ where: { id: id } })
        product ? res.status(200).json({ Product: product }) :
                res.status(404).send(`Product with ID ${id} is not found!`)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server Error" });
      }
}

export const updateProduct = async (req, res) => {
    const id = req.params.id
    const { title, category, description, price, supplier } = req.body
    if (!title || !category || !description || !price || !supplier)
        return res.status(400).send('All fields are required!')
    try {
        const product = await Product.findOne({ where: { id: id } })
        const user = await User.findOne({ where: { id: product.userId } })
        if (!product)
            return res.status(404).send(`Product with ID ${id} is not found!`)
        if (user) {
        const editProduct = await Product.update({ title, category, description, price, supplier }, { where: { id: id } })
        editProduct ? res.status(200).json({ message: `Product with ID ${id} updated successfully!`, Product: product }) :
                res.status(400).send(`Error occured, Product with ID ${id} could not be updated!`)
        }
        else
            return res.status(404).send(`You are not authorized to update the Product ${id}!`)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server Error" });
      }
}

export const deleteProduct = async (req, res) => {
    const id = req.params.id
    try {
        const product = await Product.findOne({ where: { id: id } })
        const user = await User.findOne({ where: { id: product.userId } })
        if (!product)
            return res.status(404).send(`Product with ID ${id} is not found!`)
        if (user) {
            await product.destroy()
            return res.status(200).send(`Product with ID ${id} deleted successfully!`)
        }
        else
            return res.status(404).send(`You are not authorized to delete the Product ${id}!`)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server Error" });
      }
}