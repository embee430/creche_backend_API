'use strict';

module.exports = (sequelize, DataTypes) => {
  const Child = sequelize.define('Child', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false
    },
    parentId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    passportImage: {
      type: DataTypes.STRING
    },
    gender: {
      type: DataTypes.ENUM('Male', 'Female'),
      allowNull: false
    }
  }, {
    timestamps: true
  });
  Child.associate = function(models) {
    Child.belongsTo(models.User, { foreignKey: 'parentId' });
  };
  return Child;
};
