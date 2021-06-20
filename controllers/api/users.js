// 
// Handles CRUD operations for User model
// Requires authentication to create, update, and delete operations
// 
const router = require('express').Router();
const User = require('../../models/User');
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');
const withAuth = require('../../utils/auth');

// Get all users - Data will be in the res.body
router.get('/', async (req, res) => {
  try {
    // Get all users with their related data
    const userData = await User.findAll({
      include: [{
        model: Post
      }, {
        model: Comment
      }],
      attributes: {
        exclude: ["password"]
      },
    });

    // Serialize data so the template can read it
    const users = userData.map((user) => user.get({
      plain: true
    }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      users,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a user by id - Data will be in the res.body
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [{
        model: Post
      }, {
        model: Comment
      }],
      attributes: {
        exclude: ["password"]
      },
    });

    const user = userData.get({
      plain: true
    });

    res.render('user', {
      ...user,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Post a user - Data is in the req.body and req.session
router.post('/', withAuth, async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a user  - Data is in the req.body and req.session
router.put("/:id", withAuth, async (req, res) => {
  // Update a user by its `id` value
  try {
    const user = await User.update(req.body, {
      where: {
        id: req.params.id
      },
    });
    if (!user) {
      res.status(404).json({
        message: "User id not found!"
      });
      return;
    }
    res.status(200).json(user);
  } catch (err0r) {
    res.status(500).json(error);
  }
});

// Delete a user - Data is in the req.body and req.session
router.delete("/:id", withAuth, async (req, res) => {
  // Delete a user by its `id` value
  try {
    const user = await User.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!user) {
      res.status(404).json({
        message: "User id not found!"
      });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Post a login request - Data is in the req.body and req.session
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (!userData) {
      res
        .status(400)
        .json({
          message: 'Incorrect email, please try again'
        });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({
          message: 'Incorrect password, please try again'
        });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({
        user: userData,
        message: 'You are now logged in!'
      });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// Post a logout request - Data is in the req.body and req.session
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;