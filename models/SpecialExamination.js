module.exports = (sequelize, DataTypes) => {
  const SpecialExamination = sequelize.define(
    'SpecialExamination',
    {
      examination: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      result: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'special_examinations',
      timestamps: true,
      createAt: 'examDate',
      updateAt: 'lastEdit',
    }
  );

  return SpecialExamination;
};
