//
// Handles CRUD operations for Post model
// Requires authentication to create, update, and delete operations
//
const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all posts - Data will be in the res.body
router.get('/', async (req, res) => {
  try {
    // Get all posts with their related data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password'],
          },
        },
        {
          model: Comment,
          attributes: {
            include: [
              [
                sequelize.literal(
                  '(SELECT name FROM user WHERE user.id = comments.user_id)'
                ),
                'userName',
              ],
            ],
          },
          order: [['date_created', 'DESC']],
        },
      ],
      order: [['date_created', 'DESC']],
    });

    res.status(200).json(postData);
    return;

    // Serialize data so the template can read it
    const posts = postData.map((post) =>
      post.get({
        plain: true,
      })
    );

    // Pass serialized data and session flag into template
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json({ message: `Error: ${err.message}` });
  }
});

// Get a post by id - Data will be in the res.body
router.get('/:id', async (req, res) => {
  try {
    // Get all posts with their related data
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password'],
          },
        },
        {
          model: Comment,
          attributes: {
            include: [
              [
                sequelize.literal(
                  '(SELECT name FROM user WHERE user.id = comments.user_id)'
                ),
                'userName',
              ],
            ],
          },
          order: [['date_created', 'DESC']],
        },
      ],
    });

    res.status(200).json(postData);
    return;

    // Serialize data so the template can read it
    const posts = postData.map((post) =>
      post.get({
        plain: true,
      })
    );

    // Pass serialized data and session flag into template
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json({ message: `Error: ${err.message}` });
  }
});

// Post a post - Data is in the req.body and req.session
router.post('/', withAuth, async (req, res) => {
  const { action, postId } = req.body;
  try {
    // Action = 1: View, 2: Add, 3: Edit, 4: Delete, 6: Comment
    switch (action) {
      case '1':
        break;
      case '2':
        const newPost = await Post.create(req.body);
        break;
      case '3':
        const editPost = await Post.update(req.body, {
          where: {
            id: postId,
          },
        });
        if (!editPost) {
          res.status(404).json({
            message: 'Post id not found!',
          });
        }
        break;
      case '4':
        const deletePost = await Post.destroy({
          where: {
            id: postId,
          },
        });
        if (!deletePost) {
          res.status(404).json({
            message: 'Post id not found!',
          });
        }
        break;
      case '5':
        const newComment = await Comment.create(req.body);
        break;
    }

    // res.status(200).json({ message: 'Post created successfully!' });
    res.redirect('/');
  } catch (err) {
    res.status(400).json({ message: `Error: ${err.message}` });
  }
});

// Update a post  - Data is in the req.body and req.session
router.put('/:id', withAuth, async (req, res) => {
  // Update a post by its `id` value
  try {
    const post = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!post) {
      res.status(404).json({
        message: 'Post id not found!',
      });
      return;
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(error);
  }
});

// Delete a post - Data is in the req.body and req.session
router.delete('/:id', withAuth, async (req, res) => {
  // Delete a post by its `id` value
  try {
    const post = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!post) {
      res.status(404).json({
        message: 'Post id not found!',
      });
      return;
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
