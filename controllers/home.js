const router = require("express").Router();
const sequelize = require('../config/connection');
const { Op } = require("sequelize");
const {User, Post, Comment} = require("../models");
const withAuth = require("../utils/auth");

// Get all posts - Data will be in the res.body
router.get("/", async (req, res) => {
  try {
    // Get all posts and their associated data
    const postData = await Post.findAll({
      include: [{
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
        {
          model: Comment,
          attributes: {
            include: [
              [
                sequelize.literal(
                  "(SELECT name FROM user WHERE user.id = comments.user_id)"
                ),
                "userName",
              ],
            ]
          }
        }
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({
      plain: true
    }));
    // Pass serialized data and session flag into template
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in
    });   
  } catch (err) {
    res.status(500).json({message: `Error: ${err.message}`});
  }
});

// Get a post by id - Data will be in the res.body
router.get("/posts/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{
        model: User,
        attributes: {
          exclude: ["password"]
        }
      }, {
        model: Comment,
        attributes: {
          include: [
            [
              sequelize.literal(
                "(SELECT name FROM user WHERE user.id = comments.user_id)"
              ),
              "userName",
            ],
          ]
        }
      }],
    });

    // res.status(200).json(postData);
    // return;

    const post = postData.get({
      plain: true
    });

    res.render("posts", {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a post by text - Data will be in the res.body
router.get("/posts/search/:text", async (req, res) => {
  try {
    // Get all posts and their associated data
    const postData = await Post.findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: `%${req.params.text}%`
            }
          },
          {
            contents: {
              [Op.like]: `%${req.params.text}%`
            }
          },
        ]
      },
      include: [{
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
        {
          model: Comment,
          attributes: {
            include: [
              [
                sequelize.literal(
                  "(SELECT name FROM user WHERE user.id = comments.user_id)"
                ),
                "userName",
              ],
            ]
          }
        }
      ],
    });

    res.status(200).json(postData);
    return;

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({
      plain: true
    }));

    // Pass serialized data and session flag into template
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in
    });   
  } catch (err) {
    res.status(500).json({message: `Error: ${err.message}`});
  }
});

// Get posts for the dashboard
router.get("/dashboard", withAuth, async (req, res) => {
  console.log(req.session.user_id)
  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: [{
        model: Post
      }, {
        model: Comment
      }],
      attributes: {
        exclude: ["password"]
      },
    });

    // res.status(200).json(userData);
    // return;

    const user = userData.get({
      plain: true
    });

    res.render("dashboard", {
      ...user,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json({message: `Error: ${err.message}`});
  }
});

// Use withAuth middleware to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: {
        exclude: ["password"]
      },
      include: [{
        model: Post
      },
      {
        model: Comment
      }
    ],
    });

    const user = userData.get({
      plain: true
    });

    res.render("profile", {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

router.get("/logout", (req, res) => {
  // If the user is already logged in, destroy the session and redirect the request to the homepage
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  res.redirect("/");
});

module.exports = router;