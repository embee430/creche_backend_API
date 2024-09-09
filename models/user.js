'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Roles',
        key: 'id'
      }
    }
  }, {
    timestamps: true
  });
  User.associate = function(models) {
    User.belongsTo(models.Role, { foreignKey: 'roleId' });
  };
  return User;
};
