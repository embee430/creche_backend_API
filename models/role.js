'use strict';

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    rolename: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: true
  });
  return Role;
};
