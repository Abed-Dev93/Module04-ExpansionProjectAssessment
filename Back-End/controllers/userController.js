import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    const { firstname, lastname, email, password, role } = req.body
    if (!firstname || !lastname || !email || !password || !role)
        return res.status(400).send('All fields are required!')
    try {
        const existingUser = await User.findOne({ where: { email: email } })
        if (existingUser)
            return res.status(400).send('No Credentials!')
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            firstname, lastname, email, password: hashedPassword, role
        })
        const token = jwt.sign({ id: newUser.id }, process.env.SECRET_TOKEN, { expiresIn: '12h' })
        res.cookie('access_token', token, { httpOnly: true, secure: true, sameSite: 'None' })
        return res.status(200).send('You have been registered successfully')
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server Error" });
      }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password)
        return res.status(400).send('All fields are required!')
    try {
        const user = await User.findOne({ where: { email: email } })
        if (!user)
            return res.status(404).send(`No Credentials!`)
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (passwordMatch) {
            const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN, { expiresIn: '12h' })
            await user.update({ token })
            res.cookie('access_token', token, { httpOnly: true, secure: true, sameSite: 'none' })
            return res.status(200).json({ user, token })
        }
        else
            return res.status(501).send('False Credentials!')
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}