const express = require('express');
const bun = require('bun');
const { authenticateUser, sessionMiddleware } = require('./auth');
const Training = require('./models/Training');
const Unit = require('./models/Unit');  // Add Unit model if implementing unit management

const app = express();
app.use(express.json());
app.use(sessionMiddleware);

// Secure routing middleware
const authorized = (req, res, next) => {
  if (!req.session.user) return res.status(401).send('Unauthorized');
  next();
};

// Login and Logout Routes
app.get('/login', (req, res) => {
  // Login form logic (HTML form)
  res.sendFile(__dirname + '/public/login.html');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (await authenticateUser(username, password)) {
    req.session.user = username;
    res.redirect('/trainings');
  } else {
    res.status(401).send('Invalid credentials');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

// Training Management Routes
app.get('/trainings', authorized, async (req, res) => {
  const trainings = await Training.find({});
  res.json(trainings);
});

app.post('/trainings', authorized, async (req, res) => {
  // Validate training data (including unit association if implemented)
  try {
    const training = new Training(req.body);
    await training.save();
    res.status(201).json(training);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// ... Implement additional routes for editing, deleting trainings (authorized)
// ... (Optional) Implement routes for unit management (authorized)

// Serve static frontend files (if using a frontend framework)
app.use(express.static(__dirname + '/public'));

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
