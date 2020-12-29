module.exports = (sequelize, DataTypes) => {
  const PregnantHistory = sequelize.define(
    'PregnantHistory',
    {
      deliverDate: {
        type: DataTypes.DATEONLY,
      },
      birthAtGa: {
        type: DataTypes.INTEGER,
      },
      deliverMethod: {
        type: DataTypes.STRING,
      },
      complication: {
        type: DataTypes.STRING,
      },
      birthPlace: {
        type: DataTypes.STRING,
      },
      childGender: {
        type: DataTypes.ENUM(['หญิง', 'ชาย', 'อื่นๆ']),
      },
      childWeight: {
        type: DataTypes.DOUBLE,
      },
      childStatus: {
        type: DataTypes.ENUM(['มีชีวิตอยู่', 'เสียชีวิตแล้ว', 'แท้ง']),
      },
    },
    {
      tableName: 'pregnant_histories',
      timestamps: true,
    }
  );

  PregnantHistory.associate = (models) => {
    PregnantHistory.belongsTo(models.MotherProfile, { foreignKey: 'motherId', allowNull: false });
    PregnantHistory.belongsTo(models.CurrentPregnancy, { foreignKey: 'curPregId' });
    PregnantHistory.hasMany(models.Child, { foreignKey: 'pregHistoryId' });
  };

  return PregnantHistory;
};
