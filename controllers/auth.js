const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const regex = {
  email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
}

module.exports = {
  register: async (req, res) => {

    const {email, password, firstName, lastName} = req.body;

    if(!email.match(regex.email)) {
      return res.status(401).send('Please supply a valid email');
    }
    
    if(!password.match(regex.password)) {
      return res.status(401).send('Please supply a valid password');
    }

    try {
      const salt = await bcrypt.genSalt();
      const hashpw = await bcrypt.hash(password, salt);
  
      const existingUser = await userModel.findOne({email: email});

      if(existingUser) {
        return res.status(409).send('Account with entered email already exists.');
      }

      const user = new userModel({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashpw
      });
  
      await user.save((err, doc) => {
        console.log(err, doc)
        if(err) {
          return res.status(500).send(err);
        }
        res.sendStatus(204);
      })
      
    } catch (error) {
      res.status(500).send(error);
    }
  },
  login: async (req, res) => {

    const {email, password} = req.body;
    
    if(!email.match(regex.email)) {
      return res.status(401).send('Please supply a valid email');
    }

    // if (!req.headers.authorization) {
    //   return res.sendStatus(401);
    // }

    try {
      const existingUser = await userModel.findOne({email: email});

      if (existingUser) {
        if (await bcrypt.compare(password, existingUser.password)) {
          return res.json({token: jwt.sign({email: existingUser.email}, process.env.TOKEN_SECRET)})
        } else {
          return res.status(400).send("Username/Password doesn't match");
        }
      } else {
        return res.status(400).send("Username/Password doesn't match");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  },
  verifyJWT: async (req, res, next) => {
    console.log(req.headers.authorization)
    if(!req.headers.authorization) {
      return res.sendStatus(403);
    }

    jwt.verify(req.headers.authorization, process.env.TOKEN_SECRET, (err, user) => {
      if(err) {
        return res.sendStatus(500);
      }

      req.user = user;
      next();
    })
  }
}