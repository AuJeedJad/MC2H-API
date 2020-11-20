module.exports = (sequelize, DataTypes) => {
  const MotherMedicalHistory = sequelize.define(
    'MotherMedicalHistory',
    {
      isDiabetes: {
        type: DataTypes.BOOLEAN,
      },
      isHypertension: {
        type: DataTypes.BOOLEAN,
      },
      isHeartDisease: {
        type: DataTypes.BOOLEAN,
      },
      isThyroid: {
        type: DataTypes.BOOLEAN,
      },
      isAnemia: {
        type: DataTypes.BOOLEAN,
      },
      otherDisease: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'mother_medical_histories',
      timestamps: true,
    }
  );

  MotherMedicalHistory.associate = (models) => {
    MotherMedicalHistory.belongsTo(models.MotherProfile, { foreignKey: 'motherId' });
    MotherMedicalHistory.hasOne(models.FamilyMedicalHistory, { foreignKey: 'motherMedHistoryId' });
    MotherMedicalHistory.hasMany(models.DrugAllergy, { foreignKey: 'motherMedHistoryId' });
    MotherMedicalHistory.hasMany(models.CesareanSection, { foreignKey: 'motherMedHistoryId' });
  };

  return MotherMedicalHistory;
};
