module.exports = {
  register: (req, res) => {
    // Validate
    // Encrypt password
    // Insert into DB
    res.send('Register');
  },
  login: (req, res) => {
    res.send('Login');
  }
}