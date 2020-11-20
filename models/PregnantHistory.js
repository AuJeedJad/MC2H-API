module.exports = (sequelize, DataTypes) => {
  const PregnantHistory = sequelize.define('PregnantHistory', {
    deliverDate: {
      type: DataTypes.DATEONLY
    },
    birthAtGa: {
      type: DataTypes.INTEGER
    },
    deliverMethod: {
      type: DataTypes.STRING
    },
    complication: {
      type: DataTypes.STRING
    },
    birthPlace: {
      type: DataTypes.STRING
    },
    childGender: {
      type: DataTypes.ENUM(['หญิง', 'ชาย', 'อื่นๆ'])
    },
    childWeight: {
      type: DataTypes.DOUBLE
    },
    childStatus: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'pregnant_histories',
    timestamps: true
  });

  return PregnantHistory;
};