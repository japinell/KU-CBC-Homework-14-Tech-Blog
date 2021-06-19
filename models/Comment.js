const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// 
// Comment model definition
//
class Comment extends Model {
  getUsername() {
    return '';
  }
}
// Constructor
Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'id',
      },
    },
    contents: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    dateCreated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = Post;
