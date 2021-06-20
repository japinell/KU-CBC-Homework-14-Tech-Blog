const sequelize = require('../config/connection');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({
    force: true
  });
  console.log('\n----- DATABASE SYNCED -----\n');

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  console.log('\n----- USERS SEEDED -----\n');

  const posts = await Post.bulkCreate(postData, {
    individualHooks: true,
    returning: true,
  });
  console.log('\n----- POSTS SEEDED -----\n');

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
    });
  }
  console.log('\n----- COMMENTS SEEDED -----\n');

  process.exit(0);
};

seedDatabase();