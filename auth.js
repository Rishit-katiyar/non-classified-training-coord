const bcrypt = require('bcrypt');
const expressSession = require('express-session');

const User = require('./models/User');  // Replace with your user model

async function authenticateUser(username, password) {
  const user = await User.findOne({ username });
  if (!user) return false;
  return await bcrypt.compare(password, user.password);
}

const sessionMiddleware = expressSession({
  secret: 'your_secret_key',  // Replace with a strong secret key
  resave: false,
  saveUninitialized: true,
});

module.exports = { authenticateUser, sessionMiddleware };
