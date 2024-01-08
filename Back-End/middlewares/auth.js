import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token
    if (!token)
        return res.status(401).send('Unauthorized, missing token!')
    try {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN)
        req.user = decoded
        if (req.user.role === 'admin')
            next()
        else
            return res.status(405).send('Access denied, you have no permission!')
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ error: "Unauthorized - Invalid token" });
      }
}

export const authorizedUser = (req, res, next) => {
    const token = req.cookies.access_token
    if (token)
        next()
    else
        return res.status(405).send('Unauthorized!')
}

export const logOut = (req, res) => {
    return res.clearCookie('access_token').status(200).send('Successfully Logged Out!')
  }