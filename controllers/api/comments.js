// 
// Handles CRUD operations for Comment model
// Does not need authentation to see comments, but for create, update, and delete operations
// 
const router = require('express').Router();
const {
  comment
} = require('../../models');
const withAuth = require('../../utils/auth');

// Get all comments - Data will be in the res.body
router.get('/', async (req, res) => {
  try {
    // Get all comments with their related data
    const commentData = await Comment.findAll({
      include: [{
        model: Comment,
        attributes: {
          exclude: ['password']
        }
      }, {
        model: Post
      }],
    });

    // Serialize data so the template can read it
    const comments = commentData.map((comment) => Comment.get({
      plain: true
    }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      comments,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a comment by id - Data will be in the res.body
router.get('/comment/:id', async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id, {
      include: [{
        model: comment,
        attributes: {
          exclude: ['password']
        }
      }, {
        model: Post
      }],
    });

    if (!commentData) {
      res.status(404).json({
        message: 'No comment found with this id!'
      });
      return;
    }

    const comment = commentData.get({
      plain: true
    });

    res.render('comment', {
      ...comment,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Post a comment - Data is in the req.body and req.session
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      comment_id: req.session.comment_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a comment - Data is in the req.body and req.session
router.put("/:id", withAuth, async (req, res) => {
  // Update a comment by its `id` value
  try {
    const comment = await Comment.update(req.body, {
      where: {
        id: req.params.id
      },
    });
    if (!comment) {
      res.status(404).json({
        message: "Comment id not found!"
      });
      return;
    }
    res.status(200).json(comment);
  } catch (err0r) {
    res.status(500).json(error);
  }
});

// Delete a comment - Data is in the req.body and req.session
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id
      },
    });

    if (!commentData) {
      res.status(404).json({
        message: 'No comment found with this id!'
      });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;