import jwt from 'jsonwebtoken'
import { AuthRequest, MyToken } from '../types/auth'

export const isAuthenticated = async (req: AuthRequest, res, next) => {
    const { authorization } = req.headers
  
    jwt.verify(
      authorization,
      process.env.HASHING,
      async (err, token: MyToken) => {
        if (err) {
          return res.status(401).json({
            message: 'Invalid token',
          })
        }
        req.email = token.email
        //need to try and send the id i just dont know where to get it from
        next()
        // check if token is expired
      }
    )
  }
  