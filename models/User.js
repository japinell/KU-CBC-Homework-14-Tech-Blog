const {
  Model,
  DataTypes
} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
// 
// User model definition
//
class User extends Model {
  checkPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
}
// Constructor
User.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8],
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  userCreated: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "admin",
  },
  dateCreated: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  userUpdated: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "admin",
  },
  dateUpdated: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  hooks: {
    beforeCreate: async (user) => {
      user.password = await bcrypt.hash(user.password, 10);
      return user;
    },
    beforeUpdate: async (user) => {
      user.password = await bcrypt.hash(user.password, 10);
      return user;
    },
  },
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'user',
});

module.exports = User;