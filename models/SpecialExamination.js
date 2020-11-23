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
      createdAt: 'examDate',
      updatedAt: 'lastEdit',
    }
  );

  SpecialExamination.associate = (models) => {
    SpecialExamination.belongsTo(models.ANC, { foreignKey: 'ancId' });
  };

  return SpecialExamination;
};
