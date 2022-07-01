import {NextFunction, Request, Response,  } from "express"
import jwt from "jsonwebtoken"

const config = process.env;

const verifyToken = (req:Request, res:Response, next:NextFunction) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY as string);
    console.log(decoded) 
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};
export default verifyToken