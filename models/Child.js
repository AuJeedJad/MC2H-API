module.exports = (sequelize, DataTypes) => {
  const Child = sequelize.define('Child', {
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    birthDate: {
      type: DataTypes.DATEONLY
    },
    idCard: {
      type: DataTypes.INTEGER(13)
    }
  }, {
    tableName: 'childs',
    timestamps: true
  });

  return Child;
};