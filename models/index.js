const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {
  foreignKey: 'userId'
});

User.hasMany(Comment, {
  foreignKey: 'userId'
});

Post.hasMany(Comment, {
  foreignKey: 'postId'
});

Post.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Post, {
  foreignKey: 'postId',
  onDelete: 'CASCADE'
});

module.exports = { User, Post, Comment };
