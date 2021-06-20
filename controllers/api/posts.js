// 
// Handles CRUD operations for Post model
// Requires authentication to create, update, and delete operations
// 
const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// Get all posts - Data will be in the res.body
router.get("/", async (req, res) => {
  try {
    // Get all posts with their related data
    const postData = await Post.findAll({
      include: [{
        model: User,
        attributes: {
          exclude: ["password"]
        }
      }, {
        model: Comment
      }],
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
    res.status(500).json(err);
  }
});

// Post a post - Data is in the req.body and req.session
router.post("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.create(req.body);

    req.session.save(() => {
      req.session.post_id = postData.id;
      req.session.logged_in = true;

      res.status(200).json(postData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a post  - Data is in the req.body and req.session
router.put("/:id", withAuth, async (req, res) => {
  // Update a post by its `id` value
  try {
    const post = await Post.update(req.body, {
      where: {
        id: req.params.id
      },
    });
    if (!post) {
      res.status(404).json({
        message: "Post id not found!"
      });
      return;
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(error);
  }
});

// Delete a post - Data is in the req.body and req.session
router.delete("/:id", withAuth, async (req, res) => {
  // Delete a post by its `id` value
  try {
    const post = await Post.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!post) {
      res.status(404).json({
        message: "Post id not found!"
      });
      return;
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
