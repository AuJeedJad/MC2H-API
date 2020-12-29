module.exports = (sequelize, DataTypes) => {
  const FamilyMedicalHistory = sequelize.define(
    'FamilyMedicalHistory',
    {
      isSeizure: {
        type: DataTypes.BOOLEAN,
      },
      isDiabetes: {
        type: DataTypes.BOOLEAN,
      },
      isHypertension: {
        type: DataTypes.BOOLEAN,
      },
      isBirthDefect: {
        type: DataTypes.BOOLEAN,
      },
      isTwin: {
        type: DataTypes.BOOLEAN,
      },
      isMentalRetardation: {
        type: DataTypes.BOOLEAN,
      },
      otherDisease: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'family_medical_histories',
      timestamps: true,
    }
  );

  FamilyMedicalHistory.associate = (models) => {
    FamilyMedicalHistory.belongsTo(models.MotherMedicalHistory, { foreignKey: 'motherMedHistoryId', allowNull: false });
  };

  return FamilyMedicalHistory;
};
