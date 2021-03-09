const userModel = require('../models/users');
const bcrypt = require('bcrypt');

const regex = {
  email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
}

module.exports = {
  register: async (req, res) => {

    const {email, password, firstName, lastName} = req.body;

    if(!email.match(regex.email)) {
      res.status(401).send('Please supply a valid email');
    }
    
    if(!password.match(regex.password)) {
      res.status(401).send('Please supply a valid password');
    }

    try {
      const salt = await bcrypt.genSalt();
      const hashpw = await bcrypt.hash(password, salt);
  
      const existingUser = await userModel.findOne({email: email})
      console.log(existingUser)
      if(existingUser) {
        return res.status(409).send('Account with entered email already exists.')
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
    // Validate
    // Encrypt password
    // Insert into DB
  },
  login: (req, res) => {
    // Validate
    // Check PW
    res.send('Login');
  }
}